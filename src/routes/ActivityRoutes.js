const express = require('express')
const router = express.Router()
const ActivityTicketController = require('../controllers/ActivityTicketController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/add', ActivityTicketController.addTicket)
router.get('/get', ActivityTicketController.getAllTicket)
router.get('/get/:slug', ActivityTicketController.getTicketBySlug)
router.patch('/update/:slug', updateTicket)

module.exports = router
