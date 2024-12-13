import { Router } from 'express';
import { getAdminIdByEmail } from '../controllers/adminGet.controller';
import { validateAdmin } from '../controllers/validateAdmin.controller';
import { getAdminByEmail } from '../controllers/getAdminByEmail.controller';

const router = Router();

router.get('/', getAdminByEmail);
router.get('/id', getAdminIdByEmail);
router.post('/validate', validateAdmin);

export default router;
