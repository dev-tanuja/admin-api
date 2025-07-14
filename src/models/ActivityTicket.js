const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["Active", "Disable"],
    default: "Active"
  },
  banner_img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'upload',
    default: null
  },
  mobile_banner_img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'upload',
    default: null
  },

  short_description: {
    type: String,
    default: ''
  },

  description: {
    type: String,
    default: ''
  },

  additional_information: {
    type: String,
    default: ''
  },

  featured_img: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'upload',
    default: null
  },

  gallery_images: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'upload'
  }],
  highlights : {

    type: String,
  },
  cancellation_policy : {
        type: String,

  },


  price_variation: [{
    duration: { type: String, required: true },  // Example: "2 hours"

    // Pricing broken down for adults & children
    prices: {
      adult_price: { type: Number, required: true },
      child_price: { type: Number },  // Optional if same as adult
      offer_adult_price: { type: Number },
      offer_child_price: { type: Number }
    },

    availability: { 
      type: Number,  // e.g., 50 tickets available
      required: true,
      min: 0,
      max : 6,
    },
    // Time-slot based availability
    time_slot: {
      start_time: { type: String },  // Example: "14:00"
      end_time: { type: String }     // Example: "16:00"
    },

    // Availability either daily or for a specific date
    everyday: { type: Boolean, default: false },
    dates: [{ type: Date }]  // multiple specific dates supported
  }],


  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'location'
  },
  pickup_location : {
    type: String,
  },


}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
