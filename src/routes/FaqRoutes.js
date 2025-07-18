const express = require('express');
const router = express.Router();
const FaqController = require('../controllers/FaqController');

router.post('/add', FaqController.create);
router.get('/get', FaqController.getAll); // optional query ?activityId=...
router.get('/get/:id', FaqController.get);
router.put('/update/:id', FaqController.update);
router.delete('/delete/:id', FaqController.delete);

module.exports = router;
