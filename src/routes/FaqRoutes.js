const express = require('express')
const router = express.Router()
const FaqController = require('../controllers/FaqController')

router.post('/add', FaqController.create)
router.get('/get', FaqController.getAll)
router.get('/get/:id', FaqController.get)
router.patch('/update/:id', FaqController.update)
router.delete('/delete/:id', FaqController.delete)

module.exports = router
