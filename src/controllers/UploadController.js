const Upload = require('../models/Upload')
const {
  uploadFileToBunny,
  deleteFileFromBunny
} = require('../utils/bunnyUploader')

exports.uploadImages = async (req, res) => {
  try {
    const metaArray = JSON.parse(req.body.meta || '[]')
    const folder = req.body.folder || 'general'
    const files = req.files || []

    if (!files.length)
      return res.status(400).json({ message: 'No files uploaded' })
    if (metaArray.length !== files.length)
      return res
        .status(400)
        .json({ message: 'Mismatch between images and metadata.' })

    const imagesData = []

    for (let i = 0; i < files.length; i++) {
      const meta = metaArray[i] || {}
      const file = files[i]
      const filename = `${Date.now()}-${file.originalname}`
      const fullPath = `${folder}/${filename}`
      const { url } = await uploadFileToBunny(file.buffer, fullPath)
      imagesData.push({
        name: file.originalname,
        title: meta.title || '',
        alt: meta.alt || '',
        url,
        publicId: fullPath
      })
    }

    const savedImages = await Upload.insertMany(imagesData)

    res.status(201).json({
      message: 'Images uploaded successfully',
      images: savedImages
    })
  } catch (error) {
    res.status(500).json({
      message: 'Image upload failed',
      error: error.message
    })
  }
}

exports.getAllImages = async (req, res) => {
  try {
    let { page = 1, limit = 25 } = req.query

    page = parseInt(page)
    limit = parseInt(limit)

    const skip = (page - 1) * limit
    const images = await Upload.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    // Get total count for pagination info
    const total = await Upload.countDocuments()
    res.status(200).json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      count: images.length,
      data: images
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch images',
      error: error.message
    })
  }
}

exports.deleteImage = async (req, res) => {
  try {
    const imageId = req.params.id
    const image = await Upload.findById(imageId)

    if (!image) return res.status(404).json({ message: 'Image not found' })

    await deleteFileFromBunny(image.publicId) // Delete from Bunny
    await Upload.findByIdAndDelete(imageId) // Delete DB record

    res
      .status(200)
      .json({ message: 'Image and references deleted successfully' })
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to delete image', error: error.message })
  }
}
