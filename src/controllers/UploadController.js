const Image = require('../models/Upload');

exports.uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { title, alt } = req.body;

    const newImage = new Image({
      name: req.file.originalname,
      title: title || '',
      alt: alt || '',
      url: req.file.path,
      publicId: req.file.filename
    });

    const savedImage = await newImage.save();
    res.status(201).json({
      message: 'Image uploaded successfully',
      image: savedImage
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      message: 'Image upload failed',
      error: error.message || 'Unknown server error'
    });
  }
};