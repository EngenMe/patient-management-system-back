import { Router } from 'express';
import { getAdminIdByEmail } from '../controllers/adminGet.controller';

const router = Router();

router.get('/id', getAdminIdByEmail);

export default router;
