// Test script for MongoDB CRUD operations on Blog and Category
const mongoose = require('mongoose');
const Blog = require('./models/Blog');
const Category = require('./models/Category');

async function testDbCrud() {
  await mongoose.connect('mongodb://localhost:27017/blog_platform', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // 1. Create a category
  const category = new Category({ name: 'TestCategory' });
  await category.save();
  console.log('Category created:', category);

  // 2. Create a blog
  const blog = new Blog({
    title: 'Test Blog',
    description: 'This is a test blog.',
    tags: ['test', 'sample'],
    category: category._id,
  });
  await blog.save();
  console.log('Blog created:', blog);

  // 3. Read blogs
  const blogs = await Blog.find().populate('category');
  console.log('All blogs:', blogs);

  // 4. Update a blog
  blog.title = 'Updated Test Blog';
  await blog.save();
  console.log('Blog updated:', blog);

  // 5. Delete the blog
  await Blog.findByIdAndDelete(blog._id);
  console.log('Blog deleted');

  // 6. Delete the category
  await Category.findByIdAndDelete(category._id);
  console.log('Category deleted');

  await mongoose.disconnect();
}

testDbCrud().catch(console.error);
