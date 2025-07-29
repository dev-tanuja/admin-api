const express = require('express');
const router = express.Router();
const upload = require('../middlewares/bunnyUpload'); 
const UploadController = require('../controllers/UploadController');

router.get('/get', UploadController.getAllImages);
router.delete('/delete/:id', UploadController.deleteImage);
router.post('/upload', upload.any(), UploadController.uploadImages);

module.exports = router;