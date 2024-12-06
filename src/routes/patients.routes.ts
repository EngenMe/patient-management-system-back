import { Router } from 'express';
import { postPatient } from '../controllers/patientPost.controller';
import { reshapePatientData } from '../helpers/reshapePatientData';

const router = Router();

router.post('/patients', reshapePatientData, postPatient);

export default router;
