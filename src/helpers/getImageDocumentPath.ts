import AWS from 'aws-sdk';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const SUPPORTED_FORMATS = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif'];

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export const getImageDocumentPath = async (file: Express.Multer.File): Promise<string> => {
    if (!SUPPORTED_FORMATS.includes(file.mimetype)) {
        throw new Error('Unsupported file format. Supported formats: SVG, PNG, JPG, GIF.');
    }

    try {
        const fileExtension = path.extname(file.originalname);
        const uniqueFileName = `${uuidv4()}${fileExtension}`;

        const params = {
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: `uploads/${uniqueFileName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
            ACL: 'private',
        };

        const uploadResult = await s3.upload(params).promise();
        return uploadResult.Location;
    } catch (error) {
        console.error('Error uploading file to S3:', error);
        throw new Error('Failed to upload the file.');
    }
};
