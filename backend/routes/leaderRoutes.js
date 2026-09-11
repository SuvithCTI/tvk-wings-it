import express from 'express';
import { getLeaders, createLeader, updateLeader, deleteLeader } from '../controllers/leaderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getLeaders);
router.post('/', protect, admin, createLeader);
router.put('/:id', protect, admin, updateLeader);
router.delete('/:id', protect, admin, deleteLeader);

export default router;
