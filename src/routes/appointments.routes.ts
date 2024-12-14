import { Router } from 'express';
import { postAppointment } from '../controllers/postAppointment.controller';
import { getAllAppointments } from '../controllers/getAllAppointments.controller';
import { getAppointmentStatesCount } from '../controllers/getAppointmentStatesCount.controller';
import { scheduleAnAppointment } from '../controllers/scheduleAnAppointment.controller';
import { cancelAnAppointment } from '../controllers/cancelAnAppointment.controller';

const router = Router();

router.get('/', getAllAppointments);
router.post('/', postAppointment);
router.get('/count', getAppointmentStatesCount);
router.patch('/:id/schedule', scheduleAnAppointment);
router.patch('/:id/cancel', cancelAnAppointment);

export default router;
