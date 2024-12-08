import { Request, Response, NextFunction } from 'express';
import Doctor from '../../src/models/doctor.model';
import { getAllDoctors } from '../../src/controllers/doctor.controller';

jest.mock('../../src/models/doctor.model');

describe('getAllDoctors', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should return 200 with a list of doctors if data exists', async () => {
        const mockDoctors = [
            { id: 1, name: 'Dr. Smith', specialty: 'Cardiology' },
            { id: 2, name: 'Dr. Johnson', specialty: 'Dermatology' },
        ];

        (Doctor.findAll as jest.Mock).mockResolvedValue(mockDoctors);

        await getAllDoctors(req as Request, res as Response, next);

        expect(Doctor.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Doctors retrieved successfully.',
            data: mockDoctors,
        });
    });

    it('should return 404 if no doctors are found', async () => {
        (Doctor.findAll as jest.Mock).mockResolvedValue([]);

        await getAllDoctors(req as Request, res as Response, next);

        expect(Doctor.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'No doctors found.',
        });
    });

    it('should call next with an error if the query fails', async () => {
        const error = new Error('Database error');
        (Doctor.findAll as jest.Mock).mockRejectedValue(error);

        await getAllDoctors(req as Request, res as Response, next);

        expect(Doctor.findAll).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    });
});
