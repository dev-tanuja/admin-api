const express = require('express')
const router = express.Router()
const MetaController = require('../controllers/MetaController')

router.post('/add', MetaController.addMeta)
router.patch('/update/:id', MetaController.updateMeta)
router.get('/get', MetaController.getAllMeta)
router.get('/get/:id', MetaController.getSingleMeta)
router.delete('/delete/:id', MetaController.deleteMeta)

module.exports = router
