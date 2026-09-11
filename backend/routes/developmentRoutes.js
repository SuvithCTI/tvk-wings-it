import express from 'express';
import { getDevelopments, createDevelopment, updateDevelopment, deleteDevelopment } from '../controllers/developmentController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getDevelopments);
router.post('/', protect, adminOnly, createDevelopment);
router.put('/:id', protect, adminOnly, updateDevelopment);
router.delete('/:id', protect, adminOnly, deleteDevelopment);

export default router;
