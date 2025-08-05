const HomeBanner = require('../models/HomeBanner')

exports.createHomeBanner = async (req, res) => {
  try {
    const existing = await HomeBanner.findOne({ slug })
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: 'Slug already exists' })
    }

    const banner = await HomeBanner.create(req.body)
    res.status(201).json({ success: true, data: banner })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
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

    if (req.body.slug && req.body.slug !== slug) {
      return res.status(400).json({
        success: false,
        message: 'Slug cannot be updated',
      })
    }

    delete req.body.slug

    const updatedBanner = await HomeBanner.findOneAndUpdate(
      { slug },
      req.body,
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
      data: updatedBanner,
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
}
