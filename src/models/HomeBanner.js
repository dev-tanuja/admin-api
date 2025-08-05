const mongoose = require('mongoose')

const HomeBannerSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category_section: [
      {
        categoryId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          required: true,
        },
        video: { type: mongoose.Schema.Types.ObjectId, ref: 'Upload' },
        banner_img: { type: mongoose.Schema.Types.ObjectId, ref: 'Upload' },
        title: {
          type: String,
        },
        sub_title: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('HomeBanner', HomeBannerSchema)
