import { Router } from 'express';
import { postAppointment } from '../controllers/postAppointment.controller';

const router = Router();

router.post('/appointments', postAppointment);

export default router;
