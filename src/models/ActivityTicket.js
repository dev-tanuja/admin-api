const mongoose = require('mongoose')

const ActivityTicket = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    banner_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null,
    },
    mobile_banner_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null,
    },

    short_description: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    additional_information: {
      type: String,
      default: '',
    },

    featured_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null,
    },

    gallery_images: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload',
      },
    ],
    video_link: {
      type: String,
    },
    highlights: {
      type: String,
    },
    cancellation_policy: {
      type: String,
    },
    inclusions: {
      type: String,
    },
    timing_info: {
      type: String,
    },

    price_variation: [
      {
        duration: { type: String, required: true }, // Example: "2 hours"

        prices: {
          adult_price: { type: Number, required: true },
          child_price: { type: Number }, // Optional if same as adult
          offer_adult_price: { type: Number },
          offer_child_price: { type: Number },
          infant_price: { type: Number },
          offer_infant_price: { type: Number },
        },

        availability: {
          total: { type: Number },
          booked: { type: Number, default: 0 },
          max: { type: Number, default: 6 },
        },

        dates: [{ type: Date }],
      },
    ],

    location: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
    },
    pickup_location: {
      type: String,
    },
    status: {
      type: String,
      enum: ['Active', 'Disable'],
      default: 'Active',
    },
    slot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('ActivityTicket', ActivityTicket)
