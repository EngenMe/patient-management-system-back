import { Router } from 'express';
import { verifyOtp } from '../controllers/verifyOtp.controller';

const router = Router();

router.post('/verify-otp', verifyOtp);

export default router;
