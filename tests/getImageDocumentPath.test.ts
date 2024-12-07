import { S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { v4 as uuidv4 } from 'uuid';
import { getImageDocumentPath } from '../src/helpers/getImageDocumentPath';

jest.mock('@aws-sdk/lib-storage', () => ({
    Upload: jest.fn(),
}));
jest.mock('uuid', () => ({
    v4: jest.fn(),
}));

describe('getImageDocumentPath', () => {
    const mockFile = {
        originalname: 'test.png',
        mimetype: 'image/png',
        buffer: Buffer.from('test content'),
    } as Express.Multer.File;

    const mockBucketName = 'example-bucket';
    const mockRegion = 'us-east-1';
    const mockS3Client = {};

    beforeEach(() => {
        jest.clearAllMocks();
        process.env.AWS_BUCKET_NAME = mockBucketName;
        process.env.AWS_REGION = mockRegion;
    });

    it('should upload a file and return the file URL', async () => {
        const mockUuid = 'mocked-uuid';
        const mockLocation = `https://${mockBucketName}.s3.${mockRegion}.amazonaws.com/uploads/mocked-uuid.png`;

        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        (Upload as unknown as jest.Mock).mockImplementation(({ client, params }) => {
            expect(client).toBeDefined();

            expect(params).toEqual({
                Bucket: mockBucketName,
                Key: `uploads/${mockUuid}.png`,
                Body: mockFile.buffer,
                ContentType: mockFile.mimetype,
                ACL: 'private',
            });

            return {
                done: jest.fn().mockResolvedValue({
                    Location: mockLocation,
                }),
            };
        });

        const filePath = await getImageDocumentPath(mockFile);

        expect(filePath).toBe(mockLocation);
        expect(Upload).toHaveBeenCalledTimes(1);
    });

    it('should throw an error for unsupported file formats', async () => {
        const unsupportedFile = {
            ...mockFile,
            mimetype: 'application/pdf',
        };

        await expect(getImageDocumentPath(unsupportedFile)).rejects.toThrow(
            'Unsupported file format. Supported formats: SVG, PNG, JPG, GIF.'
        );
    });

    it('should throw an error if the upload fails', async () => {
        (uuidv4 as jest.Mock).mockReturnValue('mocked-uuid');
        (Upload as unknown as jest.Mock).mockImplementation(() => ({
            done: jest.fn().mockRejectedValue(new Error('Upload failed')),
        }));

        await expect(getImageDocumentPath(mockFile)).rejects.toThrow('Failed to upload the file.');
    });
});
