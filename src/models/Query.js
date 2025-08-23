const mongoose = require('mongoose')

const querySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Query', querySchema)
