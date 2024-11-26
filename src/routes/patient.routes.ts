import { Router } from 'express';
import { validatePatient } from '../controllers/patient.controller';

const router = Router();

router.post('/validate', validatePatient);

export default router;
