const Blog = require('../models/Blog');

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
    const blog = new Blog({ title, description, tags });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, tags } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required.' });
    }
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, description, tags },
      { new: true, runValidators: true }
    );
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json({ message: 'Blog deleted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Comment text is required.' });
    }
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    blog.comments.push({ text });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
