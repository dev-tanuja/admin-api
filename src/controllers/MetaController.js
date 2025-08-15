const Meta = require('../models/Meta')

exports.addMeta = async (req, res) => {
  try {
    const { name, widget, order_no } = req.body

    if (!name || !widget || !order_no) {
      return res.status(400).json({
        success: false,
        message: 'Name and widget are required'
      })
    }
    const meta = await Meta.create({ name, widget, order_no })

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

exports.updateMeta = async (req, res) => {
  try {
    const { order_no, name, widget } = req.body

    if (!order_no || !name || !widget) {
      return res.status(400).json({
        success: false,
        message: 'order_no, name and widget are required'
      })
    }

    const meta = await Meta.findOneAndUpdate(
      { order_no },
      { name, widget },
      { new: true, upsert: true }
    )

    res.status(200).json({
      success: true,
      message: 'Meta updated successfully',
      data: meta
    })
  } catch (error) {
    console.error('Error updating meta:', error)
    res.status(500).json({
      success: false,
      message: 'Server error'
    })
  }
}

exports.getAllMeta = async (req, res) => {
  try {
    const metas = await Meta.find().sort({ order_no: 1 }).lean()

    res.status(200).json({
      success: true,
      count: metas.length,
      data: metas
    })
  } catch (error) {
    console.error('Error fetching meta posts:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getSingleMeta = async (req, res) => {
  try {
    const name = req.params.name
    const order_no = req.params.order_no
    const meta = await Meta.findOne({ name, order_no }).lean()

    if (!meta) {
      return res
        .status(404)
        .json({ success: false, message: 'Meta post not found' })
    }

    res.status(200).json({ success: true, data: meta })
  } catch (error) {
    console.error('Error fetching single meta post:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.deleteMeta = async (req, res) => {
  try {
    const name = req.params.name
    const order_no = req.params.order_no

    const deletedMeta = await Meta.findOneAndDelete({ name, order_no })

    if (!deletedMeta) {
      return res
        .status(404)
        .json({ success: false, message: 'Meta post not found' })
    }

    res.status(200).json({
      success: true,
      message: 'Meta post deleted successfully',
      data: deletedMeta
    })
  } catch (error) {
    console.error('Error deleting meta post:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
