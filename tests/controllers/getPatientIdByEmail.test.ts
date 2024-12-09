import { Request, Response, NextFunction } from 'express';
import Patient from '../../src/models/patient.model';
import { getPatientIdByEmail } from '../../src/controllers/patientGet.controller';

jest.mock('../../src/models/patient.model');

describe('getPatientIdByEmail', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            query: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should return 400 if email query parameter is missing', async () => {
        await getPatientIdByEmail(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Email query parameter is required and must be a valid string.',
        });
    });

    it('should return 404 if no patient is found', async () => {
        req.query = { email: 'nonexistent@example.com' };

        (Patient.findOne as jest.Mock).mockResolvedValue(null);

        await getPatientIdByEmail(req as Request, res as Response, next);

        expect(Patient.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Patient not found.',
        });
    });

    it('should return 200 and patient ID if patient is found', async () => {
        req.query = { email: 'test@example.com' };

        const mockPatient = { id: '123', email: 'test@example.com' };
        (Patient.findOne as jest.Mock).mockResolvedValue(mockPatient);

        await getPatientIdByEmail(req as Request, res as Response, next);

        expect(Patient.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Patient ID retrieved successfully.',
            data: { patientId: '123' },
        });
    });

    it('should call next with an error if the query fails', async () => {
        req.query = { email: 'test@example.com' };

        const error = new Error('Database error');
        (Patient.findOne as jest.Mock).mockRejectedValue(error);

        await getPatientIdByEmail(req as Request, res as Response, next);

        expect(Patient.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        expect(next).toHaveBeenCalledWith(error);
    });
});
