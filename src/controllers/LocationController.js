const Location = require('../models/Location')

// Create a new Location
exports.create = async (req, res) => {
  try {
    const { name, slug, map_link } = req.body
    if (!name || !slug) {
      return res.status(400).json({ message: 'Name and slug are required.' })
    }

    // Check if slug or name already exists
    const existing = await Location.findOne({ $or: [{ slug }, { name }] })
    if (existing) {
      return res
        .status(409)
        .json({ message: 'Location name or slug already exists.' })
    }

    const location = new Location({ name, slug, map_link })
    await location.save()
    res.status(201).json({ message: 'Location created', data: location })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all Locations
exports.getAll = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const total = await Location.countDocuments()

    const locations = await Location.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: locations.length,
      data: locations
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get single Location by slug
exports.get = async (req, res) => {
  try {
    const location = await Location.findOne({ slug: req.params.slug })
    if (!location) {
      return res.status(404).json({ message: 'Location not found' })
    }
    res.status(200).json({ data: location })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update Location by slug
exports.update = async (req, res) => {
  try {
    const { name, slug, map_link } = req.body

    // Optionally, validate slug and name here if required

    const updatedLocation = await Location.findOneAndUpdate(
      { slug: req.params.slug },
      { name, map_link },
      { new: true, runValidators: true }
    )

    if (!updatedLocation) {
      return res.status(404).json({ message: 'Location not found' })
    }

    res.status(200).json({ message: 'Location updated', data: updatedLocation })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete Location by slug
exports.delete = async (req, res) => {
  try {
    const deleted = await Location.findOneAndDelete({ slug: req.params.slug })
    if (!deleted) {
      return res.status(404).json({ message: 'Location not found' })
    }
    res.status(200).json({ message: 'Location deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
