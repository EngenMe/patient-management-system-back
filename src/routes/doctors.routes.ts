import { Router } from 'express';
import { getAllDoctors } from '../controllers/doctor.controller';

const router = Router();

router.get('/', getAllDoctors);

export default router;
