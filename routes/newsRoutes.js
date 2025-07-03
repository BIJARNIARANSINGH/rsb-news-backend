const express = require('express');
const router = express.Router();
const { 
  createNews, 
  getAllNews, 
  getNewsById, 
  updateNews, 
  deleteNews 
} = require('../controllers/newsController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// 🚫 Multer और upload को हटा दिया गया है क्योंकि तुम JSON भेज रहे हो

// Create news
router.post('/', verifyToken, isAdmin, createNews);

// Get all news
router.get('/', getAllNews);

// Get single news
router.get('/:id', getNewsById);

// Update news
router.put('/:id', verifyToken, isAdmin, updateNews);

// Delete news
router.delete('/:id', verifyToken, isAdmin, deleteNews);

module.exports = router;
