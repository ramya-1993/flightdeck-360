const Flight = require('../models/Flight');

exports.createFlight = async (req,res) => {
  try {
    const { flightNumber, flightName, from, to, journeyDateTime, seats } = req.body;
    const flight = new Flight({ flightNumber, flightName, from, to, journeyDateTime, seats });
    await flight.save();
    res.status(201).json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFlights = async (req,res) => {
  try {
    const { from, to, journeyDate } = req.query;
    const query = {};
    if (from) query.from = from;
    if (to) query.to = to;
    if (journeyDate) {
      const d = new Date(journeyDate);
      const next = new Date(d);
      next.setDate(d.getDate()+1);
      query.journeyDateTime = { $gte: d, $lt: next };
    }
    const flights = await Flight.find(query).sort({ journeyDateTime: 1 });
    res.json(flights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getFlight = async (req,res) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateFlight = async (req,res) => {
  try {
    const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(flight);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFlight = async (req,res) => {
  try {
    await Flight.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
