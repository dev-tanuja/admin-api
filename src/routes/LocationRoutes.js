const express = require('express');
const router = express.Router();
const LocationController = require('../controllers/LocationController');

router.post('/add', LocationController.create);
router.get('/get', LocationController.getAll);
router.get('/get/:slug', LocationController.get);
router.patch('/update/:slug', LocationController.update);
router.delete('/delete/:slug', LocationController.delete);

module.exports = router;
