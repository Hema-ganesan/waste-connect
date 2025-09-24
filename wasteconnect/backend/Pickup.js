const mongoose = require('mongoose');

const PickupSchema = new mongoose.Schema({
  userName: String,
  phone: String,
  address: String,
  binType: String,
  items: String,
  status: { type: String, enum: ['requested','scheduled','completed'], default: 'requested' },
  scheduledDate: Date,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pickup', PickupSchema);
