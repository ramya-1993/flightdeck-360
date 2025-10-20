const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
  flightNumber: { type: String, required: true, unique: true },
  flightName: { type: String, required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  journeyDateTime: { type: Date, required: true },
  seats: { type: Number, default: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Flight', FlightSchema);
