const express = require('express');
const router = express.Router();
const upload = require('../middlewares/cloudinaryUpload');
const UploadController = require('../controllers/UploadController');


router.post('/upload', (req, res, next) => {
  upload.single('image')(req, res, next);
}, UploadController.uploadImage);

router.get('/get', UploadController.getAllImages);
router.delete('/delete/:id', UploadController.deleteImage);


module.exports = router;