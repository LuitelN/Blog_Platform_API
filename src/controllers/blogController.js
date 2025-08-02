const Blog = require('../models/Blog');
const Category = require('../models/Category');

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('category');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single blog
exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('category');
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, description, tags, category_name } = req.body;
    if (!title || !description || !category_name) {
      return res.status(400).json({ error: 'Title, description, and category_name are required.' });
    }
    let category = await Category.findOne({ name: category_name });
    if (!category) {
      category = new Category({ name: category_name });
      await category.save();
    }
    const blog = new Blog({ title, description, tags, category: category._id });
    await blog.save();
    await blog.populate('category');
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { title, description, tags, category_name } = req.body;
    if (!title || !description || !category_name) {
      return res.status(400).json({ error: 'Title, description, and category_name are required.' });
    }
    let blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: 'Blog not found.' });

    let category = await Category.findOne({ name: category_name });
    if (!category) {
      category = new Category({ name: category_name });
      await category.save();
    }
    blog.title = title;
    blog.description = description;
    blog.tags = tags;
    blog.category = category._id;
    await blog.save();
    await blog.populate('category');
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
