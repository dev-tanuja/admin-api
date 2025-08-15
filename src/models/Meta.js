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
    },
    order_no: { type: String, required: true, min: 1, max: 5, unique: true }
  },
  { timestamps: true }
)
MetaSchema.index({ name: 1, order_no: 1 }, { unique: true })

module.exports = mongoose.model('Meta', MetaSchema)
