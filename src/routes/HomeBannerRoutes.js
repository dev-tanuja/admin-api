const express = require('express')
const router = express.Router()
const homeBannerController = require('../controllers/homeBannerController')

router.post('/add', homeBannerController.createHomeBanner)
router.get('/get', homeBannerController.getAllHomeBanners)
router.patch('/update/:slug', homeBannerController.updateHomeBanner)

module.exports = router
