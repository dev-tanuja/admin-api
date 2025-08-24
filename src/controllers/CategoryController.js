const Category = require('../models/Category')
const mongoose = require('mongoose')

// Create a new category
exports.add = async (req, res) => {
  try {
    const {
      name,
      sub_title,
      slug,
      status,
      banner_img,
      mobile_banner_img,
      thumbnail,
      og_details,
      meta_details
    } = req.body

    // Validate required fields
    if (!name || !slug) {
      return res.status(400).json({ message: 'Invalid data provided' })
    }

    // Check if slug already exists
    const existing = await Category.findOne({ slug })
    if (existing) {
      return res
        .status(409)
        .json({ message: 'Category with this slug already exists' })
    }
    // Check if name already exists
    const existingName = await Category.findOne({ name })
    if (existingName) {
      return res
        .status(409)
        .json({ message: 'Category with this name already exists' })
    }

    const category = new Category({
      name,
      sub_title,
      slug,
      status
    })

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img._id)) {
      category.banner_img = banner_img._id
    }

    if (thumbnail && mongoose.Types.ObjectId.isValid(thumbnail._id)) {
      category.thumbnail = thumbnail._id
    }

    if (
      mobile_banner_img &&
      mongoose.Types.ObjectId.isValid(mobile_banner_img._id)
    ) {
      category.mobile_banner_img = mobile_banner_img._id
    }

    if (meta_details) {
      category.meta_details = meta_details
    }
    if (og_details) {
      category.og_details = og_details
    }

    await category.save()

    res.status(201).json({ message: 'Category created successfully', category })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get all categories with pagination
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10 // Allow dynamic limit
    const skip = (page - 1) * limit

    const total = await Category.countDocuments()

    const categories = await Category.find()
      .populate('banner_img', 'url alt')
      .populate('mobile_banner_img', 'url alt')
      .populate('thumbnail', 'url alt')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: categories.length,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get a single category by slug
exports.get = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug })
      .populate('banner_img', 'url alt')
      .populate('mobile_banner_img', 'url alt')
      .populate('thumbnail', 'url alt')

    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({ success: true, data: category })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Update category
exports.updateCategory = async (req, res) => {
  try {
    const {
      name,
      sub_title,
      slug,
      status,
      banner_img,
      mobile_banner_img,
      thumbnail,
      meta_details,
      og_details
    } = req.body
    const currentSlug = req.params.slug

    // Fetch current category
    const category = await Category.findOne({ slug: currentSlug })
    if (!category) {
      return res.status(404).json({ message: 'Category not found' })
    }

    const updateFields = {}

    if (name !== undefined) updateFields.name = name
    if (sub_title !== undefined) updateFields.sub_title = sub_title
    if (slug !== undefined) {
      if (slug !== currentSlug) {
        const existing = await Category.findOne({ slug })
        if (existing) {
          return res.status(409).json({ message: 'Slug already exists' })
        }
      }
      updateFields.slug = slug
    }

    if (status !== undefined) {
      if (!['Active', 'Disable'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' })
      }
      updateFields.status = status
    }

    if (banner_img !== undefined) updateFields.banner_img = banner_img
    if (thumbnail !== undefined) updateFields.thumbnail = thumbnail
    if (mobile_banner_img !== undefined)
      updateFields.mobile_banner_img = mobile_banner_img
    if (meta_details) {
      category.meta_details = meta_details
    }
    if (og_details) {
      category.og_details = og_details
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { slug: currentSlug },
      { $set: updateFields },
      { new: true }
    )

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    })
  } catch (error) {
    console.error('Update category error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete category
exports.delete = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug
    })

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' })
    }

    res.status(200).json({ message: 'Category deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.dropdown = async (req, res) => {
  try {
    const categories = await Category.find()
      .select('name slug')
      .sort({ order_no: 1 })
      .lean()
    res.status(200).json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
