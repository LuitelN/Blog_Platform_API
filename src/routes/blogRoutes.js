const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.post('/', blogController.createBlog);
router.get('/', blogController.getBlogs);
router.get('/:id', blogController.getBlog);
router.put('/:id', blogController.updateBlog);
router.delete('/:id', blogController.deleteBlog);
router.post('/:id/comments', blogController.addComment);

module.exports = router;
