import { Router } from 'express';
import { getAllDoctors } from '../controllers/doctor.controller';
import { getDoctorById } from '../controllers/getDoctorById.controller';

const router = Router();

router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

export default router;
