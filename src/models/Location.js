const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  map_link: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);
