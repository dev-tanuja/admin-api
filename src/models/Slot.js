const mongoose = require("mongoose");

const SlotSchema = new mongoose.Schema({
  activityId: {  
    type: mongoose.Schema.Types.ObjectId,
    ref: "ActivityTicket",
    required: false
  },

  defaultSlots: [
    {
      days: [{
        type: String,
        enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
      }],
      slots: [
        {
          startTime: { type: String, required: true },  
          endTime: { type: String, required: true },
          total: { type: Number, required: true },
          booked: { type: Number, default: 0 },
          max: { type: Number, default: 6 }
        }
      ]
    }
  ],

  customOverrides: [
    {
      date: { type: Date, required: true },
      slots: [
        {
          startTime: { type: String, required: true },
          endTime: { type: String, required: true },
          capacity: { type: Number, required: true }
        }
      ]
    }
  ]

}, { timestamps: true });

module.exports = mongoose.model("Slot", SlotSchema);
