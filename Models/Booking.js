const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  type: { type: String, required: true, enum: ['event', 'room', 'general'] },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  event_type: { type: String },
  guest_count: { type: Number },
  event_date: { type: Date },
  venue: { type: String },
  rooms: { type: Number },
  services: [{ type: String }],
  special_requests: { type: String },
  status: { 
    type: String, 
    required: true, 
    enum: ['new', 'contacted', 'confirmed', 'cancelled'],
    default: 'new'
  },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
