const FeaturedTour = require('../models/FeaturedTour')

exports.createOrUpdateFeaturedTour = async (req, res) => {
  try {
    const { title, slug, tours } = req.body

    if (!Array.isArray(tours)) {
      return res
        .status(400)
        .json({ success: false, message: 'Tours must be an array' })
    }

    if (tours.length > 12) {
      return res
        .status(400)
        .json({ success: false, message: 'Max 12 tours allowed' })
    }

    const uniqueTours = [...new Set(tours.map((t) => t._id.toString()))]

    let featuredTour = await FeaturedTour.findOne({ slug })

    if (featuredTour) {
      // Update existing section
      featuredTour.title = title
      featuredTour.tours = uniqueTours
      await featuredTour.save()

      return res.status(200).json({
        success: true,
        message: 'Featured tour section updated',
        data: featuredTour
      })
    }

    featuredTour = await FeaturedTour.create({
      title,
      slug,
      tours: uniqueTours
    })

    res.status(201).json({
      success: true,
      message: 'Featured tour section created',
      data: featuredTour
    })
  } catch (error) {
    console.error('Error creating/updating featured tour:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getAllFeaturedTours = async (req, res) => {
  try {
    const featuredTours = await FeaturedTour.find()
      .populate({
        path: 'tours',
        select: 'title'
      })
      .sort({ createdAt: -1 })
      .lean()

    res.status(200).json({
      success: true,
      count: featuredTours.length,
      data: featuredTours
    })
  } catch (error) {
    console.error('Error fetching featured tours:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getSingleFeaturedTour = async (req, res) => {
  try {
    const { slug } = req.params

    const featuredTour = await FeaturedTour.findOne({ slug })
      .populate({
        path: 'tours',
        select: 'title slug'
      })
      .lean()

    if (!featuredTour) {
      return res
        .status(404)
        .json({ success: false, message: 'Featured tour not found' })
    }

    res.status(200).json({ success: true, data: featuredTour })
  } catch (error) {
    console.error('Error fetching featured tour:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
