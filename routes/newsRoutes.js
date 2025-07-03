const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { createNews, getAllNews, getNewsById, updateNews, deleteNews } = require('../controllers/newsController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    allowed.includes(file.mimetype) ? cb(null, true) : cb(new Error('Unsupported media type'));
  },
});

router.post('/', verifyToken, isAdmin, upload.single('file'), createNews);
router.get('/', getAllNews);
router.get('/:id', getNewsById);
router.put('/:id', verifyToken, isAdmin, upload.single('file'), updateNews);
router.delete('/:id', verifyToken, isAdmin, deleteNews);

module.exports = router;
