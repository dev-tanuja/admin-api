const express = require('express')
const router = express.Router()
const subscriberController = require('../controllers/SubscriberController')

router.post('/get', subscriberController.getAll)

module.exports = router
