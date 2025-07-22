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
  banner_img: { type: mongoose.Schema.Types.ObjectId, ref: 'upload' },
  mobile_banner_img: { type: mongoose.Schema.Types.ObjectId, ref: 'upload' },
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


{ timestamps: true });

module.exports = mongoose.model("category", CategorySchema);
