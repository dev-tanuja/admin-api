const Query = require('../models/Query')

exports.getAll = async (req, res) => {
  try {
    try {
      const page = parseInt(req.query.page) || 1
      const limit = parseInt(req.query.limit) || 10 
      const skip = (page - 1) * limit

      const total = await Query.countDocuments()

      const queries = await Query.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)

      res.status(200).json({
        success: true,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        count: queries.length,
        data: queries
      })
    } catch (error) {
      console.error('Error fetching queries:', error)
      res.status(500).json({ message: 'Server error', error: error.message })
    }
  } catch (error) {
    console.error('Submit query error:', error)
    res
      .status(500)
      .json({ success: false, message: 'Server error', error: error.message })
  }
}
