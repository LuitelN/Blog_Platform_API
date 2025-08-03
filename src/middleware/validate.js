// Zod validation middleware for blog creation and update
const { z } = require('zod');

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category_name: z.string().min(1, 'Category name is required'),
  tags: z.array(z.string()).optional(),
});

module.exports = (req, res, next) => {
  const result = blogSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.errors.map(e => e.message).join(', ') });
  }
  next();
};
