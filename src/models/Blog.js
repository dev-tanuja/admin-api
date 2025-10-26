const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    featured_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload'
    },
    banner_img: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Upload'
    },
    content: [
      {
        title: { type: String, trim: true },
        description: { type: String }
      }
    ],
    gallery: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Upload'
      }
    ],
    faq: [
      {
        question: { type: String, trim: true },
        answer: { type: String }
      }
    ],
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

module.exports = mongoose.model('Blog', BlogSchema)
