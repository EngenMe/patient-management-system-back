import { Router } from 'express';
import { getAllDoctors } from '../controllers/doctor.controller';

const router = Router();

router.post('/doctors', getAllDoctors);

export default router;
