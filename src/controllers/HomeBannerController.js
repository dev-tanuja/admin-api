const HomeBanner = require('../models/HomeBanner')
const mongoose = require('mongoose')

exports.createHomeBanner = async (req, res) => {
  try {
    const { slug, category_section = [] } = req.body

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: 'Slug is required',
      })
    }

    const existing = await HomeBanner.findOne({ slug })
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Slug already exists',
      })
    }

    const validatedSections = category_section.map((section) => {
      const newSection = { ...section }

      if (
        section.video &&
        mongoose.Types.ObjectId.isValid(section.video._id || section.video)
      ) {
        newSection.video = section.video._id || section.video
      } else {
        newSection.video = undefined
      }

      if (
        section.banner_img &&
        mongoose.Types.ObjectId.isValid(
          section.banner_img._id || section.banner_img
        )
      ) {
        newSection.banner_img = section.banner_img._id || section.banner_img
      } else {
        newSection.banner_img = undefined
      }

      return newSection
    })

    const banner = await HomeBanner.create({
      ...req.body,
      category_section: validatedSections,
    })

    res.status(201).json({
      success: true,
      message: 'Home banner created successfully',
      data: banner,
    })
  } catch (error) {
    console.error('Create HomeBanner Error:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    })
  }
}

exports.getAllHomeBanners = async (req, res) => {
  try {
    const banners = await HomeBanner.find().populate(
      'category_section.categoryId',
      'name slug'
    )

    res.status(200).json({ success: true, data: banners })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.updateHomeBanner = async (req, res) => {
  try {
    const { slug } = req.params

    // Prevent slug update
    if (req.body.slug && req.body.slug !== slug) {
      return res.status(400).json({
        success: false,
        message: 'Slug cannot be updated',
      })
    }

    delete req.body.slug

    const updateData = { ...req.body }

    // Validate category_section if present
    if (Array.isArray(updateData.category_section)) {
      updateData.category_section = updateData.category_section.map(
        (section) => {
          const newSection = { ...section }

          if (
            section.video &&
            mongoose.Types.ObjectId.isValid(section.video._id || section.video)
          ) {
            newSection.video = section.video._id || section.video
          } else {
            newSection.video = undefined
          }

          if (
            section.banner_img &&
            mongoose.Types.ObjectId.isValid(
              section.banner_img._id || section.banner_img
            )
          ) {
            newSection.banner_img = section.banner_img._id || section.banner_img
          } else {
            newSection.banner_img = undefined
          }

          return newSection
        }
      )
    }

    const updatedBanner = await HomeBanner.findOneAndUpdate(
      { slug },
      updateData,
      { new: true, runValidators: true }
    )

    if (!updatedBanner) {
      return res.status(404).json({
        success: false,
        message: 'HomeBanner not found',
      })
    }

    res.status(200).json({
      success: true,
      message: 'HomeBanner updated successfully',
      data: updatedBanner,
    })
  } catch (error) {
    console.error('Update HomeBanner Error:', error)
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
}
