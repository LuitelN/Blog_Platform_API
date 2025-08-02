const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Create a new blog (title, description, category_name required)
router.post('/', blogController.createBlog);

// Get all blogs, with optional search and sort
router.get('/', async (req, res) => {
  try {
    const { search, sort } = req.query;
    let query = {};
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    let blogsQuery = require('../models/Blog').find(query).populate('category');
    if (sort) {
      const sortObj = {};
      if (sort === 'createdAt') sortObj.createdAt = -1;
      if (sort === 'title') sortObj.title = 1;
      blogsQuery = blogsQuery.sort(sortObj);
    }
    const blogs = await blogsQuery;
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single blog by ID
router.get('/:id', blogController.getBlog);

// Update a blog by ID (title, description, category_name required)
router.put('/:id', blogController.updateBlog);

// Delete a blog by ID
router.delete('/:id', blogController.deleteBlog);

// Add a comment to a blog
router.post('/:id/comments', blogController.addComment);

// Add or update tags for a blog
router.patch('/:id/tags', async (req, res) => {
  try {
    const { tags } = req.body;
    if (!Array.isArray(tags)) {
      return res.status(400).json({ error: 'Tags must be an array.' });
    }
    const blog = await require('../models/Blog').findByIdAndUpdate(
      req.params.id,
      { $set: { tags } },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optional) Secure user login and authentication routes can be added here

// Documentation endpoint
router.get('/docs', (req, res) => {
  res.json({
    endpoints: {
      create: { method: 'POST', path: '/api/blogs/', body: '{title, description, category_name, tags?}' },
      getAll: { method: 'GET', path: '/api/blogs/', query: '{search?, sort?}' },
      getOne: { method: 'GET', path: '/api/blogs/:id' },
      update: { method: 'PUT', path: '/api/blogs/:id', body: '{title, description, category_name, tags?}' },
      delete: { method: 'DELETE', path: '/api/blogs/:id' },
      addComment: { method: 'POST', path: '/api/blogs/:id/comments', body: '{text}' },
      updateTags: { method: 'PATCH', path: '/api/blogs/:id/tags', body: '{tags: [String]}' }
    },
    usage: 'Use Postman or curl to interact with these endpoints. MongoDB must be running locally.'
  });
});

module.exports = router;
