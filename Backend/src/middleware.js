const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

// Middleware to verify JWT and roles
const authorize = (requiredRole) => {
  return (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access token is missing' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Attach user data to the request

      // Check the user's role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access forbidden: insufficient privileges' });
      }

      next();
    } catch (err) {
      res.status(403).json({ message: 'Invalid or expired token' });
    }
  };
};

module.exports = authorize;
