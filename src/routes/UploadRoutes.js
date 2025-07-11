const express = require('express');
const router = express.Router();
const upload = require('../middlewares/cloudinaryUpload');
const UploadController = require('../controllers/UploadController');

router.post('/upload', upload.single('image'), UploadController.uploadImage);

module.exports = router;