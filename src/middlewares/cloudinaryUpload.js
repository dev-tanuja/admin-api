const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
      console.log('In cloudinary middleware, folder:', req.body.folder);

    const folderFromClient = req.body.folder || 'uploads'; // fallback if not provided
    return {
      folder: folderFromClient,
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
      public_id: `${Date.now()}-${file.originalname.split('.')[0]}`
    };
  },
});

const upload = multer({ storage });

module.exports = upload;