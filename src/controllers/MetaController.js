const Meta = require('../models/Meta')

exports.addMeta = async (req, res) => {
  try {
    const { name, widget } = req.body

    if (!name || !widget) {
      return res.status(400).json({
        success: false,
        message: 'Name and widget are required'
      })
    }
    const meta = await Meta.create({ name, widget })

    res.status(201).json({
      success: true,
      message: 'Meta created successfully',
      data: meta
    })
  } catch (error) {
    console.error('Error creating meta:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}
