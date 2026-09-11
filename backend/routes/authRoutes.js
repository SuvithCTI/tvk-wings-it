import express from 'express';
import { sendOtp, verifyOtp, getMe, adminLogin } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/admin-login', adminLogin);
router.get('/me', protect, getMe);

export default router;
