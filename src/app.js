const express = require('express');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blog_platform', {
  
});

app.use('/api/blogs', blogRoutes);



app.get('/', (req, res) => {
  res.json({ 
    message: 'Blog Platform API is running!',
    status: 'success'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
