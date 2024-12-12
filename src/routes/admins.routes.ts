import { Router } from 'express';
import { getAdminIdByEmail } from '../controllers/adminGet.controller';
import { validateAdmin } from '../controllers/validateAdmin.controller';

const router = Router();

router.get('/id', getAdminIdByEmail);
router.get('/validate', validateAdmin);

export default router;
