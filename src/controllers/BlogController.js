const Blog = require('../models/Blog')
const mongoose = require('mongoose')

exports.addBlog = async (req, res) => {
  try {
    const { title, slug, featured_img, banner_img, content, gallery, faq } =
      req.body

    const blog = new Blog({
      title,
      slug,
      content,
      faq
    })

    if (featured_img && mongoose.Types.ObjectId.isValid(featured_img)) {
      blog.featured_img = featured_img
    }

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img)) {
      blog.banner_img = banner_img
    }

    if (Array.isArray(gallery)) {
      blog.gallery = gallery.filter((id) => mongoose.Types.ObjectId.isValid(id))
    }

    const savedBlog = await blog.save()

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: savedBlog
    })
  } catch (error) {
    console.error('Add Blog Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getAllBlogs = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = 10
    const skip = (page - 1) * limit

    const search = req.query.search || ''

    const filter = search ? { title: { $regex: search, $options: 'i' } } : {}

    const total = await Blog.countDocuments(filter)
    const blog = await Blog.find({}, 'title  slug featured_img')
      .skip(skip)
      .limit(limit)

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      count: blog.length,
      data: blog
    })
  } catch (error) {
    console.error('Get Blogs Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.getSingleBlog = async (req, res) => {
  try {
    const { slug } = req.params

    const blog = await Blog.findOne({ slug })
      .populate('featured_img', 'url alt')
      .populate('banner_img', 'url alt')
      .populate('gallery', 'url alt')
      .lean()

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' })
    }

    res.status(200).json({ success: true, data: blog })
  } catch (error) {
    console.error('Get Single Blog Error:', error)
    res.status(500).json({ success: false, message: error.message })
  }
}

exports.updateBlog = async (req, res) => {
  try {
    const { slug: currentSlug } = req.params
    const { title, slug, featured_img, banner_img, content, gallery, faq } =
      req.body

    const blog = await Blog.findOne({ slug: currentSlug })
    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found'
      })
    }

    // ✅ Update only if provided
    if (title) blog.title = title
    if (slug) blog.slug = slug

    // ✅ Validate ObjectIds for images only if you store them as references
    if (featured_img && mongoose.Types.ObjectId.isValid(featured_img)) {
      blog.featured_img = featured_img
    } else if (featured_img && typeof featured_img === 'string') {
      blog.featured_img = featured_img
    }

    if (banner_img && mongoose.Types.ObjectId.isValid(banner_img)) {
      blog.banner_img = banner_img
    } else if (banner_img && typeof banner_img === 'string') {
      blog.banner_img = banner_img
    }

    // ✅ Arrays
    if (Array.isArray(content)) blog.content = content
    if (Array.isArray(gallery)) blog.gallery = gallery
    if (Array.isArray(faq)) blog.faq = faq

    const updatedBlog = await blog.save()

    res.status(200).json({
      success: true,
      message: 'Blog updated successfully',
      data: updatedBlog
    })
  } catch (error) {
    console.error('Error updating blog:', error)
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    })
  }
}
