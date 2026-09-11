import express from 'express';
import { getLiveNews, createNews, updateNews, deleteNews } from '../controllers/newsController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLiveNews);
router.post('/', protect, admin, createNews);
router.put('/:id', protect, admin, updateNews);
router.delete('/:id', protect, admin, deleteNews);

export default router;
