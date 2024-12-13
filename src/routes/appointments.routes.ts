import { Router } from 'express';
import { postAppointment } from '../controllers/postAppointment.controller';
import { getAllAppointments } from '../controllers/getAllAppointments.controller';

const router = Router();

router.get('/', getAllAppointments);
router.post('/', postAppointment);

export default router;
