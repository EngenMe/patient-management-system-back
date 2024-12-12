import { Router } from 'express';
import { getAllIdTypes } from '../controllers/idType.controller';

const router = Router();

router.get('/', getAllIdTypes);

export default router;
