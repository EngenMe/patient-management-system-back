process.env.ACCESS_KEY = 'mock-access-key';
process.env.SECRET_ACCESS_KEY = 'mock-secret-access-key';
process.env.AWS_REGION = 'mock-bucket-region';
process.env.BUCKET_NAME = 'mock-bucket-name';

import express, { NextFunction, Request, Response } from 'express';
import request from 'supertest';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { uploadToS3 } from '../../src/middlewares/uploadToS3.middleware';

jest.mock('@aws-sdk/client-s3', () => {
    const mockS3Client = {
        send: jest.fn().mockResolvedValue({}),
    };

    return {
        S3Client: jest.fn(() => mockS3Client),
        PutObjectCommand: jest.fn(),
    };
});

describe('uploadToS3 middleware', () => {
    let app: express.Express;

    beforeAll(() => {
        process.env.ACCESS_KEY = 'mockAccessKey';
        process.env.SECRET_ACCESS_KEY = 'mockSecretKey';
        process.env.AWS_REGION = 'mock-region';
        process.env.BUCKET_NAME = 'mock-bucket';

        app = express();

        app.post('/upload', uploadToS3, (req: Request, res: Response) => {
            res.status(200).json({ fileKey: req.body.imageDocument });
        });

        app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
            console.error(err);
            res.status(500).json({ error: err.message });
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should upload a file successfully and call next', async () => {
        const response = await request(app)
            .post('/upload')
            .attach('imageDocument', Buffer.from('dummy-image-data'), 'test.png');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('fileKey');
        expect(response.body.fileKey).toMatch(/\.png$/);
    });

    it('should return a 400 error if no file is uploaded', async () => {
        const response = await request(app).post('/upload');
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('No file uploaded');
    });

    it('should return a 500 error if S3 upload fails', async () => {
        const mockS3ClientInstance = (S3Client as jest.Mock).mock.results[0].value;
        mockS3ClientInstance.send.mockRejectedValue(new Error('S3 Error'));

        const response = await request(app)
            .post('/upload')
            .attach('imageDocument', Buffer.from('dummy-image-data'), 'test.png');

        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Failed to upload file to S3');
    });

    describe('Missing AWS environment variables', () => {
        let testApp: express.Express;
        let originalAccessKey: string | undefined;
        let originalSecretAccessKey: string | undefined;
        let originalBucketRegion: string | undefined;
        let originalBucketName: string | undefined;

        beforeAll(() => {
            originalAccessKey = process.env.ACCESS_KEY;
            originalSecretAccessKey = process.env.SECRET_ACCESS_KEY;
            originalBucketRegion = process.env.AWS_REGION;
            originalBucketName = process.env.BUCKET_NAME;

            delete process.env.ACCESS_KEY;
            delete process.env.SECRET_ACCESS_KEY;
            delete process.env.AWS_REGION;
            delete process.env.BUCKET_NAME;

            testApp = express();

            testApp.post('/upload-missing-vars', uploadToS3, (req: Request, res: Response) => {
                res.status(200).json({ fileKey: req.body.imageDocument });
            });

            testApp.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
        });

        afterAll(() => {
            process.env.ACCESS_KEY = originalAccessKey;
            process.env.SECRET_ACCESS_KEY = originalSecretAccessKey;
            process.env.AWS_REGION = originalBucketRegion;
            process.env.BUCKET_NAME = originalBucketName;
        });

        it('should return a 500 error if required environment variables are missing', async () => {
            const response = await request(testApp)
                .post('/upload-missing-vars')
                .attach('imageDocument', Buffer.from('dummy-image-data'), 'test.png');

            expect(response.status).toBe(500);
            expect(response.body.error).toBe('Failed to upload file to S3');
        });
    });

    describe('Invalid form-data scenario', () => {
        let appInvalidForm: express.Express;

        beforeAll(() => {
            process.env.ACCESS_KEY = 'mockAccessKey';
            process.env.SECRET_ACCESS_KEY = 'mockSecretKey';
            process.env.AWS_REGION = 'mock-region';
            process.env.BUCKET_NAME = 'mock-bucket';

            appInvalidForm = express();
            appInvalidForm.post('/upload-invalid-form', uploadToS3, (req: Request, res: Response) => {
                res.status(200).json({ fileKey: req.body.imageDocument });
            });

            appInvalidForm.use((err: Error, req: Request, res: Response, next: NextFunction) => {
                console.error(err);
                res.status(500).json({ error: err.message });
            });
        });

        it('should return a 400 error if there is an error parsing form-data', async () => {
            const response = await request(appInvalidForm)
                .post('/upload-invalid-form')
                .set('Content-Type', 'multipart/form-data')
                .send('This is not valid multipart data');

            expect(response.status).toBe(400);
            expect(response.body.error).toBe('Invalid form-data');
        });
    });
});
