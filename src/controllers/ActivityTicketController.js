const ActivityTicket = require('../models/ActivityTicket')
const mongoose = require('mongoose')

exports.addTicket = async (req, res) => {
  try {
    const {
      title,
      sub_title,
      slug,
      short_description,
      categoryId,
      locationId,
      featured_img,
      youtube_video_link,
      video,
      gallery,
      banner_img,
      widget,
      meta_details,
      og_details,
      price,
      offer_price,
      special
    } = req.body

    const activityTicket = new ActivityTicket({
      title,
      sub_title,
      slug,
      short_description,
      youtube_video_link,
      widget,
      price,
      offer_price,
      special
    })

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      activityTicket.categoryId = categoryId
    }

    if (locationId && mongoose.Types.ObjectId.isValid(locationId)) {
      activityTicket.locationId = locationId
    }

    if (video && mongoose.Types.ObjectId.isValid(video._id)) {
      activityTicket.video = video._id
    }

    if (featured_img && mongoose.Types.ObjectId.isValid(featured_img._id)) {
      activityTicket.featured_img = featured_img._id
    }

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img._id)) {
      activityTicket.banner_img = banner_img._id
    }

    if (Array.isArray(gallery)) {
      activityTicket.gallery = gallery
        .filter((img) => img && mongoose.Types.ObjectId.isValid(img._id))
        .map((img) => img._id)
    }

    if (meta_details && typeof meta_details === 'object') {
      activityTicket.meta_details = meta_details
    }

    if (og_details && typeof og_details === 'object') {
      activityTicket.og_details = og_details
    }

    const savedTicket = await activityTicket.save()

    res.status(201).json({
      message: 'Activity ticket created successfully',
      activityTicket: savedTicket
    })
  } catch (error) {
    console.error('Create ticket error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getAllTicket = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const search = req.query.search || ''

    const filter = search ? { title: { $regex: search, $options: 'i' } } : {}

    const total = await ActivityTicket.countDocuments(filter)
    const activities = await ActivityTicket.find(
      {},
      'title  categoryId slug short_description '
    )
      .populate('categoryId', 'name slug')
      .populate('locationId', 'name slug')
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: activities.length,
      data: activities
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.getTicketBySlug = async (req, res) => {
  try {
    const { slug } = req.params
    const ticket = await ActivityTicket.findOne({ slug })
      .populate('categoryId', '_id name slug')
      .populate('locationId', '_id name slug')
      .populate('featured_img', 'url')
      .populate('banner_img', 'url')
      .populate('video', 'url')
      .populate({
        path: 'gallery',
        select: 'url'
      })
    if (!ticket) {
      return res.status(404).json({ message: 'Activity not found' })
    }

    res.status(200).json({
      success: true,
      data: {
        ...ticket.toObject()
      }
    })
  } catch (error) {
    console.error('Error fetching activity by slug:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.updateTicket = async (req, res) => {
  try {
    const { slug } = req.params
    const {
      title,
      sub_title,
      short_description,
      categoryId,
      locationId,
      featured_img,
      youtube_video_link,
      video,
      gallery,
      banner_img,
      widget,
      price,
      special,
      offer_price,
      meta_details,
      og_details
    } = req.body

    const activityTicket = await ActivityTicket.findOne({ slug })
    if (!activityTicket) {
      return res.status(404).json({ message: 'Activity ticket not found' })
    }

    if (title) activityTicket.title = title
    if (sub_title) activityTicket.sub_title = sub_title
    if (price) activityTicket.price = price
    if (offer_price) activityTicket.offer_price = offer_price
    if (special) activityTicket.special = special
    if (short_description) activityTicket.short_description = short_description
    if (youtube_video_link)
      activityTicket.youtube_video_link = youtube_video_link
    if (widget) activityTicket.widget = widget

    if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
      activityTicket.categoryId = categoryId
    }

    if (locationId && mongoose.Types.ObjectId.isValid(locationId)) {
      activityTicket.locationId = locationId
    }

    if (video && mongoose.Types.ObjectId.isValid(video._id)) {
      activityTicket.video = video._id
    }

    if (featured_img && mongoose.Types.ObjectId.isValid(featured_img._id)) {
      activityTicket.featured_img = featured_img._id
    }

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img._id)) {
      activityTicket.banner_img = banner_img._id
    }

    if (Array.isArray(gallery)) {
      activityTicket.gallery = gallery
        .filter((img) => img && mongoose.Types.ObjectId.isValid(img._id))
        .map((img) => img._id)
    }

    if (meta_details && typeof meta_details === 'object') {
      activityTicket.meta_details = meta_details
    }

    if (og_details && typeof og_details === 'object') {
      activityTicket.og_details = og_details
    }

    const updatedTicket = await activityTicket.save()

    res.status(200).json({
      message: 'Activity ticket updated successfully',
      activityTicket: updatedTicket
    })
  } catch (error) {
    console.error('Update ticket error:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.dropdown = async (req, res) => {
  try {
    const tickets = await ActivityTicket.find()
      .select('title slug')
      .sort({ order_no: 1 })
      .lean()
    res.status(200).json({
      success: true,
      data: tickets
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.searchTicket = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const search = req.query.search || ''

    let filter = {}
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { short_description: { $regex: search, $options: 'i' } }
      ]
    }

    const total = await ActivityTicket.countDocuments(filter)

    const activities = await ActivityTicket.find(
      filter,
      'title categoryId slug short_description'
    )
      .populate('categoryId', 'name slug')
      .populate('locationId', 'name slug')
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: activities.length,
      data: activities
    })
  } catch (error) {
    console.error('Error fetching activities:', error)
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
