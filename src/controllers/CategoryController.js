const Category = require("../models/Category");
const mongoose = require('mongoose');

// Create a new category
exports.add = async (req, res) => {
  try {
    const { name, slug, status, banner_img, mobile_banner_img } = req.body;

    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({ message: "Invalid data provided" });
    }

    // Check if slug already exists
    const existing = await Category.findOne({ slug });
    if (existing) {
      return res.status(409).json({ message: "Category with this slug already exists" });
    }
       // Check if name already exists
    const existingName = await Category.findOne({ name });
    if (existingName) {
      return res.status(409).json({ message: "Category with this name already exists" });
    }


    const category = new Category({
      name,
      slug,
      status,
    });

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img)) {
      category.banner_img = banner_img;
    }

    if (mobile_banner_img && mongoose.Types.ObjectId.isValid(mobile_banner_img)) {
      category.mobile_banner_img = mobile_banner_img;
    }

    await category.save();

    res.status(201).json({ message: "Category created successfully", category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all categories
exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('banner_img', 'url alt') 
      .populate('mobile_banner_img', 'url alt')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a single category by slug
exports.get = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('banner_img', 'url alt') // 👈 select only needed fields
      .populate('mobile_banner_img', 'url alt');

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({ success: true, data: category });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug, status, banner_img, mobile_banner_img } = req.body;
    const currentSlug = req.params.slug;

    // Fetch current category
    const category = await Category.findOne({ slug: currentSlug });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const updateFields = {};

    // ✅ Validate and assign only if provided
    if (name !== undefined) updateFields.name = name;
    if (slug !== undefined) {
      if (slug !== currentSlug) {
        const existing = await Category.findOne({ slug });
        if (existing) {
          return res.status(409).json({ message: 'Slug already exists' });
        }
      }
      updateFields.slug = slug;
    }

    if (status !== undefined) {
      if (!["Active", "Disable"].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' });
      }
      updateFields.status = status;
    }

    if (banner_img !== undefined) updateFields.banner_img = banner_img;
    if (mobile_banner_img !== undefined) updateFields.mobile_banner_img = mobile_banner_img;

    const updatedCategory = await Category.findOneAndUpdate(
      { slug: currentSlug },
      { $set: updateFields },
      { new: true }
    );

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    });

  } catch (error) {
    console.error('Update category error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Delete category
exports.delete = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({ slug: req.params.slug });

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
