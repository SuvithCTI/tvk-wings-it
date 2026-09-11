import express from 'express';
import {
  submitGrievance,
  trackGrievance,
  getAllGrievances,
  updateGrievanceStatus
} from '../controllers/grievanceController.js';
import { protect, adminOnly } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', submitGrievance);
router.get('/track/:trackId', trackGrievance);
router.get('/', protect, adminOnly, getAllGrievances);
router.patch('/:id', protect, adminOnly, updateGrievanceStatus);

export default router;
