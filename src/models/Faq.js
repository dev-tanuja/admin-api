const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
  activityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ActivityTicket',
    required: true
  },
  question: {
    type: String,
    required: true,
    trim: true
  },
  answer: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['Active', 'Disable'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model('Faq', FaqSchema);
