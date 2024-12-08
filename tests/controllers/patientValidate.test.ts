import { validatePatient } from '../../src/controllers/patientValidate.controller';
import Patient from '../../src/models/patient.model';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/models/patient.model');

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
            email: 'johndoe@example.com',
            phone: '1234567890',
            fullName: 'John Doe',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Patient found and all fields match.',
        });
    });

    it('should return 400 if patient is found but there are conflicting fields', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            email: 'johndoe@example.com',
            phone: '9876543210',
            fullName: 'John Smith',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Conflict detected in patient data.',
            conflictingFields: ['phone', 'fullName'],
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

    it('should include "email" in conflictingFields if the email does not match', async () => {
        (Patient.findOne as jest.Mock).mockResolvedValue({
            email: 'differentemail@example.com',
            phone: '1234567890',
            fullName: 'John Doe',
        });

        await validatePatient(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Conflict detected in patient data.',
            conflictingFields: ['email'],
        });
    });
});
