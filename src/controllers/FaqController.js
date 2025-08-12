const Faq = require('../models/Faq')

// Create new FAQ
exports.create = async (req, res) => {
  try {
    const { categoryId, question, answer, status } = req.body

    if (!categoryId || !question || !answer) {
      return res
        .status(400)
        .json({ message: 'categoryId, question, and answer are required.' })
    }

    if (status && !['Active', 'Disable'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' })
    }

    const faq = new Faq({ categoryId, question, answer, status })
    await faq.save()

    res.status(201).json({ message: 'FAQ created', data: faq })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get all FAQs (optionally filter by categoryId)
exports.getAll = async (req, res) => {
  try {
    const filter = {}
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId
    }

    // Pagination variables
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    // Get total count based on filter
    const total = await Faq.countDocuments(filter)

    const faqs = await Faq.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: faqs.length,
      data: faqs
    })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Get single FAQ by ID
exports.get = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id)
    if (!faq) {
      return res.status(404).json({ message: 'FAQ not found' })
    }
    res.status(200).json({ data: faq })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Update FAQ by ID
exports.update = async (req, res) => {
  try {
    const { question, answer, status } = req.body

    if (status && !['Active', 'Disable'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value.' })
    }

    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,
      { question, answer, status },
      { new: true, runValidators: true }
    )

    if (!updatedFaq) {
      return res.status(404).json({ message: 'FAQ not found' })
    }

    res.status(200).json({ message: 'FAQ updated', data: updatedFaq })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// Delete FAQ by ID
exports.delete = async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndDelete(req.params.id)
    if (!deletedFaq) {
      return res.status(404).json({ message: 'FAQ not found' })
    }
    res.status(200).json({ message: 'FAQ deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

exports.activityGet = async (req, res) => {}
