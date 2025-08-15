const mongoose = require('mongoose')

const MetaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    widget: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Meta', MetaSchema)
