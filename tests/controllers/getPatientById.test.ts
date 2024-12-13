import { Request, Response } from 'express';
import { getPatientById } from '../../src/controllers/getPatientById.controller';
import Patient from '../../src/models/patient.model';

jest.mock('../../src/models/patient.model');

describe('getPatientById Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockPatientFindByPk: jest.Mock;

    beforeEach(() => {
        req = {
            params: {
                id: '1',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockPatientFindByPk = Patient.findByPk as jest.Mock;
    });

    it('should return a patient with 200 status if found', async () => {
        const mockPatient = {
            id: 1,
            fullName: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+123456789',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'male',
            address: '123 Example Street',
        };

        mockPatientFindByPk.mockResolvedValue(mockPatient);

        await getPatientById(req as Request, res as Response);

        expect(mockPatientFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Patient retrieved successfully',
            patient: mockPatient,
        });
    });

    it('should return 404 if no patient is found', async () => {
        mockPatientFindByPk.mockResolvedValue(null);

        await getPatientById(req as Request, res as Response);

        expect(mockPatientFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Patient not found' });
    });

    it('should return 400 if the ID is invalid', async () => {
        req.params = { id: 'invalid-id' };

        await getPatientById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid patient ID' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockPatientFindByPk.mockRejectedValue(new Error('Unexpected error'));

        await getPatientById(req as Request, res as Response);

        expect(mockPatientFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while retrieving the patient',
        });
    });
});
