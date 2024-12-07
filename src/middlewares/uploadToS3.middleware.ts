import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketRegion = process.env.BUCKET_REGION;
const bucketName = process.env.BUCKET_NAME;

if (!accessKey || !secretAccessKey || !bucketRegion || !bucketName) {
    throw new Error('Missing required AWS environment variables');
}

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
});

export const uploadToS3 = async (req: Request, res: Response, next: NextFunction) => {
    upload.single('imageDocument')(req, res, async (err) => {
        if (err) {
            console.error('Error parsing form-data:', err);
            return res.status(400).json({ error: 'Invalid form-data' });
        }

        try {
            if (!req.file) {
                return res.status(400).json({ error: 'No file uploaded' });
            }

            const fileExtension = path.extname(req.file.originalname);
            const newFileName = `${uuidv4()}${fileExtension}`;

            const params = {
                Bucket: bucketName,
                Key: newFileName,
                Body: req.file.buffer,
                ContentType: req.file.mimetype,
            };

            const command = new PutObjectCommand(params);

            await s3.send(command);

            req.body.imageDocument = newFileName;

            next();
        } catch (error) {
            console.error('Error uploading file:', error);
            res.status(500).json({ error: 'Failed to upload file to S3' });
        }
    });
};
