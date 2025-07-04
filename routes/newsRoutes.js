const express = require('express');
const multer = require('multer');
const router = express.Router();   // ⚠️ पहले router बनाओ

const {
  createNews,
  getAllNews,
  getNewsById,
  updateNews,
  deleteNews,
} = require('../controllers/newsController');
const { verifyToken, isAdmin } = require('../middleware/auth');

// Multer setup for media uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// ✅ Test route to check file upload without auth
router.post('/test-upload', upload.single('file'), (req, res) => {
  console.log('File:', req.file);
  res.json({
    message: '✅ File uploaded successfully!',
    file: req.file,
  });
});

// ✅ CREATE news with media upload (protected + admin only)
router.post('/', upload.single('file'), createNews);
// ✅ READ all news
router.get('/', getAllNews);

// ✅ READ single news by ID
router.get('/:id', getNewsById);

// ✅ UPDATE news (with optional new media)
router.put('/:id', verifyToken, isAdmin, upload.single('file'), updateNews);

// ✅ DELETE news
router.delete('/:id', verifyToken, isAdmin, deleteNews);

module.exports = router;
