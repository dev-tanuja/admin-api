const mongoose = require('mongoose')

const ActivityTicket = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: { type: String, unique: true, trim: true },

    short_description: {
      type: String,
      default: ''
    },

    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      default: null
    },

    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      default: null
    },

    featured_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null
    },

    youtube_video_link: {
      type: String,
      default: ''
    },

    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null
    },

    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      }
    ],

    banner_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload',
      default: null
    },
    review_count: {
      type: Number,
      default: 0
    },

    widget: {
      type: String,
      default: ''
    },

    meta_details: {
      meta_title: {
        type: String,
        default: ''
      },
      meta_description: {
        type: String,
        default: ''
      },
      schema_markup: {
        type: String,
        default: ''
      }
    },
    og_details: {
      og_title: { type: String, default: '' },
      og_description: { type: String, default: '' },
      og_image: { type: String, default: '' },
      og_image_alt: { type: String, default: '' },
      og_url: { type: String, default: '' },
      og_type: { type: String, default: 'website' },
      og_site_name: { type: String, default: 'YourSiteName' },
      og_locale: { type: String, default: 'en_US' }
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('ActivityTicket', ActivityTicket)
