import { validatePatient } from '../../src/controllers/patientValidate.controller';
import Patient from '../../src/models/patient.model';
import { createOtp } from '../../src/helpers/createOtp';
import { sendOtpSms } from '../../src/services/sendOtpSms';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/models/patient.model');
jest.mock('../../src/helpers/createOtp', () => ({
    createOtp: jest.fn(),
}));
jest.mock('../../src/services/sendOtpSms', () => ({
    sendOtpSms: jest.fn(),
}));

describe('validatePatient', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {
            body: {
                fullName: 'John Doe',
                email: 'johndoe@example.com',
                phone: '1234567890',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should return 200 if patient is found and all fields match', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            fullName: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
        });

        (createOtp as jest.Mock).mockResolvedValue('123456');
        (sendOtpSms as jest.Mock).mockResolvedValue('123456');

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Patient found and all fields match.',
        });
        expect(createOtp).toHaveBeenCalledWith(1);
        expect(sendOtpSms).toHaveBeenCalledWith('123456', '1234567890');
    });

    it('should return 400 if patient is found but there are conflicting fields', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            fullName: 'Jane Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Conflict detected in patient data.',
            conflictingFields: ['fullName'],
        });
    });

    it('should return 404 if no patient is found', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue(null);

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'new_patient',
            message: 'No patient found. Redirect to new patient form.',
            redirectTo: '/patients/new',
        });
    });

    it('should call next with error if an exception occurs', async () => {
        const error = new Error('Database error');
        (Patient.findOne as jest.Mock).mockRejectedValue(error);

        await validatePatient(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });

    it('should return 400 if patient is found but the email does not match', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            fullName: 'John Doe',
            email: 'wrongemail@example.com',
            phone: '1234567890',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Conflict detected in patient data.',
            conflictingFields: ['email'],
        });
    });

    it('should return 400 if patient is found but the phone does not match', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            id: 1,
            fullName: 'John Doe',
            email: 'johndoe@example.com',
            phone: '0987654321',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Conflict detected in patient data.',
            conflictingFields: ['phone'],
        });
    });
});
