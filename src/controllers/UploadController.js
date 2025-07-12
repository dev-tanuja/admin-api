const Upload = require('../models/Upload');
const cloudinary = require('../utils/cloudinary');


exports.uploadImage = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    const { title, alt } = req.body;
    const newImage = new Upload({
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