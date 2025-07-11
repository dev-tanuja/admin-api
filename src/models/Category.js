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
    type: String, 
    default: null
  },
  mobile_banner_img: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Category", CategorySchema);
