import { Request, Response, NextFunction } from 'express';
import { getIdentificationTypeId } from '../../src/helpers/getIdentificationTypeId';
import { getPrimaryCarePhysicianId } from '../../src/helpers/getPrimaryCarePhysicainId';
import { normalizePatientData } from '../../src/middlewares/normalizePatientData.middleware';

jest.mock('../../src/helpers/getIdentificationTypeId');
jest.mock('../../src/helpers/getPrimaryCarePhysicainId');

describe('normalizePatientData middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {
                fullName: 'John Doe',
                email: 'johndoe@example.com',
                phone: '1234567890',
                identificationType: 'Passport',
                primaryCarePhysician: 'Dr. Smith',
            },
            file: {
                fieldname: 'imageDocument',
                originalname: 'test.jpg',
                encoding: '7bit',
                mimetype: 'image/jpeg',
                size: 1024,
                destination: '/uploads',
                filename: 'test.jpg',
                path: '/uploads/test.jpg',
                buffer: Buffer.from(''),
            } as Express.Multer.File,
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should reshape the patient data and add identificationTypeId and primaryCarePhysicianId', async () => {
        (getIdentificationTypeId as jest.Mock).mockResolvedValue(1);
        (getPrimaryCarePhysicianId as jest.Mock).mockResolvedValue(2);

        await normalizePatientData(req as Request, res as Response, next);

        expect(getIdentificationTypeId).toHaveBeenCalledWith('Passport');
        expect(getPrimaryCarePhysicianId).toHaveBeenCalledWith('Dr. Smith');
        expect(req.body).toEqual({
            fullName: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
            primaryCarePhysicianId: 2,
            identificationTypeId: 1,
        });
        expect(next).toHaveBeenCalled();
    });

    it('should return 400 if no file is uploaded', async () => {
        delete req.file;

        await normalizePatientData(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'No file uploaded',
        });
        expect(next).not.toHaveBeenCalled();
    });

    it('should handle errors and return 400 if an exception occurs', async () => {
        const error = new Error('Unexpected error');
        (getIdentificationTypeId as jest.Mock).mockRejectedValue(error);

        await normalizePatientData(req as Request, res as Response, next);

        expect(console.error).toHaveBeenCalledWith('Error reshaping patient data:', error);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Unexpected error',
        });
        expect(next).not.toHaveBeenCalled();
    });
});
