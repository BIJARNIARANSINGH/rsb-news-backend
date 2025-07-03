// backend/middleware/auth.js

const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Verify JWT token middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('🔑 Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('✅ Decoded Token:', decoded);

    if (!decoded.userId) {
      return res.status(403).json({ error: 'Invalid token payload' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error('❌ JWT Verification Error:', err.message);
    return res.status(403).json({ error: 'Invalid token' });
  }
};

// Check if user is admin middleware
const isAdmin = async (req, res, next) => {
  try {
    console.log('🔍 Checking admin for userId:', req.user.userId);

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Admin access only' });
    }

    console.log('✅ Admin verified');
    next();
  } catch (err) {
    console.error('❌ Admin Check Error:', err.message);
    res.status(500).json({ error: 'Authorization failed' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
