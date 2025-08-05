const express = require('express')
const router = express.Router()
const HomeBannerController = require('../controllers/HomeBannerController')

router.post('/add', HomeBannerController.createHomeBanner)
router.get('/get', HomeBannerController.getAllHomeBanners)
router.patch('/update/:slug', HomeBannerController.updateHomeBanner)

module.exports = router
