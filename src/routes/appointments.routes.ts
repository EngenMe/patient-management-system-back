import { Router } from 'express';
import { postAppointment } from '../controllers/postAppointment.controller';
import { getAllAppointments } from '../controllers/getAllAppointments.controller';
import { getAppointmentStatesCount } from '../controllers/getAppointmentStatesCount.controller';

const router = Router();

router.get('/', getAllAppointments);
router.post('/', postAppointment);
router.get('/count', getAppointmentStatesCount);

export default router;
