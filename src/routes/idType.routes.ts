import { Router } from 'express';
import { getAllIdTypes } from '../controllers/idType.controller';

const router = Router();

router.get('/id-types', getAllIdTypes);

export default router;
