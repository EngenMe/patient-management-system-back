import { Router, Request, Response } from 'express';
import { uploadToS3 } from '../middlewares/uploadToS3.middleware';

const router = Router();

router.post('/patients', uploadToS3, (req: Request, res: Response) => {
    res.send('Form data received');
});

export default router;
