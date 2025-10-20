const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  passengerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  passengerName: { type: String, required: true },
  contactNumber: { type: String },
  email: { type: String },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  flightNumber: { type: String },
  from: { type: String },
  to: { type: String },
  journeyDateTime: { type: Date },
  totalPassengers: { type: Number, default: 1 },
  assistanceRequired: { type: Boolean, default: false },
  status: { type: String, enum: ['Pending','Approved','Rejected'], default: 'Pending' },
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
