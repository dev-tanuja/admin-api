const express = require('express')
const router = express.Router()
const BlogController = require('../controllers/BlogController')

router.post('/add', BlogController.addBlog)
router.get('/get', BlogController.getAllBlogs)
router.get('/get/:slug', BlogController.getSingleBlog)
router.patch('/update/:slug', BlogController.updateBlog)

module.exports = router
