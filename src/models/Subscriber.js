const mongoose = require('mongoose')

const SubscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address']
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Subscriber', SubscriberSchema)
