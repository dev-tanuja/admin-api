const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
  name: { type: String },
  title: { type: String },
  alt: { type: String },
  url: { type: String, required: true },
  publicId: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Image', uploadSchema);