const Booking = require('../models/Booking');
const Flight = require('../models/Flight');

exports.createBooking = async (req,res) => {
  try {
    const { passengerName, contactNumber, email, flightId, totalPassengers, assistanceRequired } = req.body;
    const flight = await Flight.findById(flightId);
    if (!flight) return res.status(404).json({ message: 'Flight not found' });

    const booking = new Booking({
      passengerId: req.user._id,
      passengerName,
      contactNumber,
      email,
      flight: flight._id,
      flightNumber: flight.flightNumber,
      from: flight.from,
      to: flight.to,
      journeyDateTime: flight.journeyDateTime,
      totalPassengers,
      assistanceRequired,
      status: 'Pending'
    });
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookings = async (req,res) => {
  try {
    // If admin, return all; if passenger, return own
    if (req.user.role === 'admin') {
      const bookings = await Booking.find().populate('flight').populate('passengerId','name email');
      return res.json(bookings);
    } else {
      const bookings = await Booking.find({ passengerId: req.user._id }).populate('flight');
      return res.json(bookings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBookingStatus = async (req,res) => {
  try {
    const { status } = req.body; // Approved or Rejected
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooking = async (req,res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('flight');
    if (!booking) return res.status(404).json({ message: 'Not found' });
    // check ownership unless admin
    if (req.user.role !== 'admin' && !booking.passengerId.equals(req.user._id)) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
