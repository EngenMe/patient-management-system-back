import { Request, Response, NextFunction } from 'express';
import Admin from '../../src/models/admin.model';
import { validateAdmin } from '../../src/controllers/validateAdmin.controller';
import { hashString } from '../../src/helpers/hashString';

jest.mock('../../src/models/admin.model');
jest.mock('../../src/helpers/hashString');

describe('validateAdmin', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should return 200 with success message if admin credentials are valid', async () => {
        const mockAdmin = { id: 1, email: 'admin@example.com', password: 'hashedPassword' };

        req.body = {
            email: 'admin@example.com',
            password: 'password123',
        };

        (hashString as jest.Mock).mockReturnValue('hashedPassword');
        (Admin.findOne as jest.Mock).mockResolvedValue(mockAdmin);

        await validateAdmin(req as Request, res as Response, next);

        expect(hashString).toHaveBeenCalledWith('password123');
        expect(Admin.findOne).toHaveBeenCalledWith({
            where: {
                email: 'admin@example.com',
                password: 'hashedPassword',
            },
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Admin validated successfully.',
        });
    });

    it('should return 404 if admin credentials are invalid', async () => {
        req.body = {
            email: 'admin@example.com',
            password: 'wrongpassword',
        };

        (hashString as jest.Mock).mockReturnValue('hashedWrongPassword');
        (Admin.findOne as jest.Mock).mockResolvedValue(null);

        await validateAdmin(req as Request, res as Response, next);

        expect(hashString).toHaveBeenCalledWith('wrongpassword');
        expect(Admin.findOne).toHaveBeenCalledWith({
            where: {
                email: 'admin@example.com',
                password: 'hashedWrongPassword',
            },
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Admin not found or credentials are incorrect.',
        });
    });

    it('should call next with an error if the query fails', async () => {
        const error = new Error('Database error');

        req.body = {
            email: 'admin@example.com',
            password: 'password123',
        };

        (hashString as jest.Mock).mockReturnValue('hashedPassword');
        (Admin.findOne as jest.Mock).mockRejectedValue(error);

        await validateAdmin(req as Request, res as Response, next);

        expect(hashString).toHaveBeenCalledWith('password123');
        expect(Admin.findOne).toHaveBeenCalledWith({
            where: {
                email: 'admin@example.com',
                password: 'hashedPassword',
            },
        });
        expect(next).toHaveBeenCalledWith(error);
    });
});
