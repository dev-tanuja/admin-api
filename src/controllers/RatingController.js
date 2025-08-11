const Rating = require('../models/Rating')
const ActivityTicket = require('../models/ActivityTicket')

exports.listRatings = async (req, res) => {
  try {
    const ratings = await Rating.find()
      .select('name email rating message ticketId')
      .populate({
        path: 'ticketId',
        select: 'title'
      })
      .lean()

    res.status(200).json({ success: true, data: ratings })
  } catch (error) {
    console.error('Error fetching ratings:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.getRating = async (req, res) => {
  try {
    const { id } = req.params

    const rating = await Rating.findById(id)
      .populate('images', 'name url')
      .populate({
        path: 'ticketId',
        select: 'title'
      })
      .lean()
    if (!rating) {
      return res
        .status(404)
        .json({ success: false, message: 'Rating not found' })
    }

    res.status(200).json({ success: true, data: rating })
  } catch (error) {
    console.error('Error fetching rating:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}

exports.updateRatingStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    if (!['Published', 'Unpublished'].includes(status)) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid status value' })
    }

    // Update the rating status
    const rating = await Rating.findByIdAndUpdate(id, { status }, { new: true })
    if (!rating) {
      return res
        .status(404)
        .json({ success: false, message: 'Rating not found' })
    }

    // If status changed to Published, recalc average rating for the related ticket's category
    if (status === 'Published') {
      // Get the ticketId for this rating
      const ticketId = rating.ticketId

      if (ticketId) {
        const publishedRatings = await Rating.find({
          ticketId,
          status: 'Published'
        })
          .select('rating')
          .lean()

        if (publishedRatings.length > 0) {
          const avgRating =
            publishedRatings.reduce((acc, cur) => acc + cur.rating, 0) /
            publishedRatings.length

          await ActivityTicket.findByIdAndUpdate(ticketId, {
            review_count: avgRating
          })
        } else {
          await ActivityTicket.findByIdAndUpdate(ticketId, { avgRating: 0 })
        }
      }
    }

    res
      .status(200)
      .json({ success: true, message: 'Rating status updated', data: rating })
  } catch (error) {
    console.error('Error updating rating status:', error)
    res.status(500).json({ success: false, message: 'Server error' })
  }
}
