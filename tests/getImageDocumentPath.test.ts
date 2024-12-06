let uploadMock: jest.Mock;

jest.mock('aws-sdk', () => {
    uploadMock = jest.fn(() => ({
        promise: jest.fn(),
    }));

    return {
        S3: jest.fn().mockImplementation(() => ({
            upload: uploadMock,
        })),
    };
});

import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { getImageDocumentPath } from '../src/helpers/getImageDocumentPath';

jest.mock('uuid');

describe('getImageDocumentPath', () => {
    const mockUuid = 'mocked-uuid';

    const mockFile: Express.Multer.File = {
        fieldname: 'file',
        originalname: 'test-image.png',
        encoding: '7bit',
        mimetype: 'image/png',
        buffer: Buffer.from('mock file content'),
        size: 1024,
        destination: '/mock/path',
        filename: 'test-image.png',
        path: '/mock/path/test-image.png',
        stream: undefined as any,
    };

    beforeAll(() => {
        process.env.AWS_BUCKET_NAME = 'example-bucket';
    });

    beforeEach(() => {
        jest.clearAllMocks();
        (uuidv4 as jest.Mock).mockReturnValue(mockUuid);

        // Now just use uploadMock directly
        uploadMock.mockReturnValue({
            promise: jest.fn().mockResolvedValue({
                Location: 'https://example-bucket.s3.amazonaws.com/uploads/mocked-uuid.png',
            }),
        });
    });

    it('should upload the file to S3 and return the file URL', async () => {
        const result = await getImageDocumentPath(mockFile);

        expect(uploadMock).toHaveBeenCalledWith({
            Bucket: 'example-bucket',
            Key: `uploads/${mockUuid}.png`,
            Body: mockFile.buffer,
            ContentType: mockFile.mimetype,
            ACL: 'private',
        });

        expect(result).toBe('https://example-bucket.s3.amazonaws.com/uploads/mocked-uuid.png');
    });

    it('should throw an error for unsupported file formats', async () => {
        const unsupportedFile: Express.Multer.File = {
            ...mockFile,
            mimetype: 'application/pdf',
        };

        await expect(getImageDocumentPath(unsupportedFile)).rejects.toThrow(
            'Unsupported file format. Supported formats: SVG, PNG, JPG, GIF.'
        );

        expect(uploadMock).not.toHaveBeenCalled();
    });

    it('should handle errors during the upload process', async () => {
        uploadMock.mockReturnValue({
            promise: jest.fn().mockRejectedValue(new Error('S3 upload error')),
        });

        await expect(getImageDocumentPath(mockFile)).rejects.toThrow('Failed to upload the file.');
        expect(uploadMock).toHaveBeenCalledTimes(1);
    });
});
