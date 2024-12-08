import { getAllIdTypes } from '../../src/controllers/idType.controller';
import IdType from '../../src/models/idType.model';
import { Request, Response, NextFunction } from 'express';

jest.mock('../../src/models/idType.model');

describe('getAllIdTypes', () => {
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

    it('should return 200 with a list of id types if data exists', async () => {
        const mockIdTypes = [
            { id: 1, name: 'Passport' },
            { id: 2, name: 'Driver License' },
        ];

        (IdType.findAll as jest.Mock).mockResolvedValue(mockIdTypes);

        await getAllIdTypes(req as Request, res as Response, next);

        expect(IdType.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Doctors retrieved successfully.',
            data: mockIdTypes,
        });
    });

    it('should return 404 if no id types are found', async () => {
        (IdType.findAll as jest.Mock).mockResolvedValue([]);

        await getAllIdTypes(req as Request, res as Response, next);

        expect(IdType.findAll).toHaveBeenCalledTimes(1);
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'No doctors found.',
        });
    });

    it('should call next with an error if the query fails', async () => {
        const error = new Error('Database error');
        (IdType.findAll as jest.Mock).mockRejectedValue(error);

        await getAllIdTypes(req as Request, res as Response, next);

        expect(IdType.findAll).toHaveBeenCalledTimes(1);
        expect(next).toHaveBeenCalledWith(error);
    });
});
