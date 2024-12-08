import { postPatient } from '../../src/controllers/patientPost.controller';
import Patient from '../../src/models/patient.model';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/models/patient.model');

describe('postPatient', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

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

    it('should save a new patient and return 201 with the saved patient data', async () => {
        const mockSavedPatient = {
            id: '1',
            fullName: 'John Doe',
            email: 'johndoe@example.com',
            phone: '1234567890',
        };

        (Patient.prototype.save as jest.Mock).mockResolvedValue(mockSavedPatient);

        await postPatient(req as Request, res as Response, next);

        expect(Patient.prototype.save).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            data: mockSavedPatient,
        });
    });

    it('should call next with an error if saving the patient fails', async () => {
        const error = new Error('Database error');
        (Patient.prototype.save as jest.Mock).mockRejectedValue(error);

        await postPatient(req as Request, res as Response, next);

        expect(Patient.prototype.save).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    });
});
