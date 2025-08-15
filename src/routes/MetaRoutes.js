const express = require('express')
const router = express.Router()
const MetaController = require('../controllers/MetaController')

router.post('/add', MetaController.addMeta)

module.exports = router
