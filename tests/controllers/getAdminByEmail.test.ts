import { Request, Response, NextFunction } from 'express';
import Admin from '../../src/models/admin.model';
import { getAdminByEmail } from '../../src/controllers/getAdminByEmail.controller';

jest.mock('../../src/models/admin.model');

describe('getAdminByEmail', () => {
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

    it('should return 400 if email query parameter is missing or invalid', async () => {
        req.query = {};

        await getAdminByEmail(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Email query parameter is required and must be a valid string.',
        });
    });

    it('should return 404 if admin is not found', async () => {
        req.query = { email: 'nonexistent@example.com' };

        (Admin.findOne as jest.Mock).mockResolvedValue(null);

        await getAdminByEmail(req as Request, res as Response, next);

        expect(Admin.findOne).toHaveBeenCalledWith({ where: { email: 'nonexistent@example.com' } });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Admin not found.',
        });
    });

    it('should return 200 with admin data if admin is found', async () => {
        req.query = { email: 'admin@example.com' };

        const mockAdmin = { id: 1, email: 'admin@example.com', fullName: 'Admin User' };
        (Admin.findOne as jest.Mock).mockResolvedValue(mockAdmin);

        await getAdminByEmail(req as Request, res as Response, next);

        expect(Admin.findOne).toHaveBeenCalledWith({ where: { email: 'admin@example.com' } });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Admin ID retrieved successfully.',
            data: { admin: mockAdmin },
        });
    });

    it('should call next with an error if the query fails', async () => {
        req.query = { email: 'admin@example.com' };

        const error = new Error('Database error');
        (Admin.findOne as jest.Mock).mockRejectedValue(error);

        await getAdminByEmail(req as Request, res as Response, next);

        expect(Admin.findOne).toHaveBeenCalledWith({ where: { email: 'admin@example.com' } });
        expect(next).toHaveBeenCalledWith(error);
    });
});
