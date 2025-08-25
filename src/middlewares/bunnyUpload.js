const multer = require('multer')
const path = require('path')
const storage = multer.memoryStorage()

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    if (['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'].includes(ext)) {
      cb(null, true)
    } else {
      cb(new Error('Only image files are allowed'))
    }
  }
})

module.exports = upload
