const express = require("express");
const router = express.Router();
const ActivityTicketController = require("../controllers/ActivityTicketController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/add", ActivityTicketController.addTicket);

module.exports = router;
