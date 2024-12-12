import { Router } from 'express';
import { postAppointment } from '../controllers/postAppointment.controller';

const router = Router();

router.post('/', postAppointment);

export default router;
