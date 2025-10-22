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
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('Blog', BlogSchema)
