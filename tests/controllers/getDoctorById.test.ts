import { Request, Response } from 'express';
import { getDoctorById } from '../../src/controllers/getDoctorById.controller';
import Doctor from '../../src/models/doctor.model';

jest.mock('../../src/models/doctor.model');

describe('getDoctorById Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockDoctorFindByPk: jest.Mock;

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

        mockDoctorFindByPk = Doctor.findByPk as jest.Mock;
    });

    it('should return a doctor with 200 status if found', async () => {
        const mockDoctor = {
            id: 1,
            name: 'Dr. Jane Smith',
            phone: '+123456789',
            email: 'jane.smith@example.com',
            speciality: 'Cardiology',
            imageUrl: 'http://example.com/jane-smith.jpg',
        };

        mockDoctorFindByPk.mockResolvedValue(mockDoctor);

        await getDoctorById(req as Request, res as Response);

        expect(mockDoctorFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Doctor retrieved successfully',
            doctor: mockDoctor,
        });
    });

    it('should return 404 if no doctor is found', async () => {
        mockDoctorFindByPk.mockResolvedValue(null);

        await getDoctorById(req as Request, res as Response);

        expect(mockDoctorFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Doctor not found' });
    });

    it('should return 400 if the ID is invalid', async () => {
        req.params = { id: 'invalid-id' };

        await getDoctorById(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid doctor ID' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockDoctorFindByPk.mockRejectedValue(new Error('Unexpected error'));

        await getDoctorById(req as Request, res as Response);

        expect(mockDoctorFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while retrieving the doctor',
        });
    });
});
