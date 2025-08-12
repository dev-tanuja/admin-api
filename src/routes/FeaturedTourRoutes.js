const express = require('express')
const router = express.Router()
const FeaturedTourController = require('../controllers/FeaturedTourController')

router.post('/add', FeaturedTourController.createOrUpdateFeaturedTour)
router.get('/get', FeaturedTourController.getAllFeaturedTours)
router.get('/get/:slug', FeaturedTourController.getSingleFeaturedTour)


module.exports = router
