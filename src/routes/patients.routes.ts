import { Router, Request, Response } from 'express';
import { uploadToS3 } from '../middlewares/uploadToS3.middleware';
import { normalizePatientData } from '../middlewares/normalizePatientData.middleware';
import { postPatient } from '../controllers/patientPost.controller';
import { getPatientIdByEmail } from '../controllers/patientGet.controller';

const router = Router();

router.get('/id', getPatientIdByEmail);
router.post('/', uploadToS3, normalizePatientData, postPatient);

export default router;
