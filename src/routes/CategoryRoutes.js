const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/CategoryController");

router.post("/add", CategoryController.add);
router.get("/get", CategoryController.getAll);
router.get("/get/:slug", CategoryController.get);
router.put("/update/:slug", CategoryController.update);
router.delete("/delete/:slug", CategoryController.delete);

module.exports = router;
