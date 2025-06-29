const express = require('express');
const router = express.Router();
const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');

const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', getAllNews);
router.get('/:id', getNewsById);

// Admin-only routes
router.post('/', authMiddleware.verifyToken, authMiddleware.isAdmin, createNews);
router.put('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, updateNews);
router.delete('/:id', authMiddleware.verifyToken, authMiddleware.isAdmin, deleteNews);

module.exports = router;