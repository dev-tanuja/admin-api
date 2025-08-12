const mongoose = require('mongoose')

const FeaturedTourSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  tours: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityTicket',
      required: true
    }
  ],
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('FeaturedTour', FeaturedTourSchema)
