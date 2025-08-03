// Simple authentication middleware for demonstration
module.exports = (req, res, next) => {
  
  const authHeader = req.headers['authorization'];
  if (authHeader === 'Bearer mysecrettoken') {
    return next();
  }
  return res.status(401).json({ error: 'Unauthorized' });
};
