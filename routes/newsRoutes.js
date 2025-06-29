import express from 'express';
import {
  createNews,
  getAllNews,
  getMyNews,
  deleteNews
} from '../controllers/newsController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllNews);
router.post('/', auth, createNews);
router.get('/my', auth, getMyNews);
router.delete('/:id', auth, deleteNews);

export default router;