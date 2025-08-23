const express = require('express')
const router = express.Router()
const QueryController = require('../controllers/QueryController')

router.get('/get', QueryController.getAll)

module.exports = router
