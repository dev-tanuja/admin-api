const express = require('express')
const router = express.Router()
const RatingController = require('../controllers/RatingController')

router.get('/get', RatingController.listRatings)
router.get('/get/:id', RatingController.getRating)
router.patch('/update/:id', RatingController.updateRatingStatus)

module.exports = router
