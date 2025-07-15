const Upload = require('../models/Upload');
const cloudinary = require('../utils/cloudinary');



exports.uploadImages = async (req, res) => {
  try {
    const { title, alt } = req.body;

    // req.files will always be an array when using upload.any()
    const files = req.files && req.files.length > 0
      ? req.files
      : [];

    if (files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }

    const imagesData = files.map(file => ({
      name: file.originalname,
      title: title || '',
      alt: alt || '',
      url: file.path,
      publicId: file.filename
    }));

    const savedImages = await Upload.insertMany(imagesData);

    res.status(201).json({
      message: 'Images uploaded successfully',
      images: savedImages
    });

  } catch (error) {
    res.status(500).json({
      message: 'Image upload failed',
      error: error.message || 'Unknown server error'
    });
  }
};



exports.getAllImages = async (req, res) => {
  try {
    const images = await Upload.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: images.length,
      data: images,
    });
  } catch (error) {
    console.error('Error fetching images:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
      error: error.message,
    });
  }
};


exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id;

    const image = await Upload.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    await cloudinary.uploader.destroy(image.publicId);

    await Upload.findByIdAndDelete(imageId);

    res.status(200).json({ message: 'Image and references deleted successfully' });
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ message: 'Failed to delete image', error: error.message });
  }
};