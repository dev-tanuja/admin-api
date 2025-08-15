const express = require('express')
const router = express.Router()
const MetaController = require('../controllers/MetaController')

router.post('/add', MetaController.addMeta)
router.patch('/update', MetaController.updateMeta)
router.get('/get', MetaController.getAllMeta)
router.get('/get/:name/:order_no', MetaController.getSingleMeta)
router.delete('/delete/:name/:order_no', MetaController.deleteMeta)

module.exports = router
