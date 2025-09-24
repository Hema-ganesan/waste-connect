const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
  name: String,
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]   // [lng, lat]
  },
  category: { type: String, enum: ['plastic','organic','e-waste','mixed'], default: 'mixed' },
  capacity: Number,
  fillLevel: { type: Number, default: 0 }
});

module.exports = mongoose.model('Bin', BinSchema);
