const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/login", AdminController.login);
router.post("/change-password", authMiddleware, AdminController.changePassword);

module.exports = router;
