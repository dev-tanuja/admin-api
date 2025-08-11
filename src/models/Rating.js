const mongoose = require('mongoose')

const RatingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    message: {
      type: String,
      required: true,
      trim: true
    },
    ticketId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ActivityTicket',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
      min: 1,
      max: 5
    },
    images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      }
    ],
    status: {
      type: String,
      enum: ['Published', 'Unpublished'],
      default: 'Unpublished'
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Rating', RatingSchema)
