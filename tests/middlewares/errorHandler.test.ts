import { Request, Response, NextFunction } from 'express';
import errorHandler from '../../src/middlewares/errorHandler';

describe('errorHandler middleware', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        next = jest.fn();
    });

    it('should handle an error with a custom status and message', () => {
        const error = {
            status: 400,
            message: 'Bad Request',
        };

        errorHandler(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'Bad Request',
        });
    });

    it('should handle an error without a custom status or message', () => {
        const error = {};

        errorHandler(error, req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 'error',
            message: 'An error occurred.',
        });
    });

    it('should log the error to the console', () => {
        const error = {
            status: 500,
            message: 'Internal Server Error',
        };

        console.error = jest.fn();

        errorHandler(error, req as Request, res as Response, next);

        expect(console.error).toHaveBeenCalledWith('Unhandled error:', error);
    });
});
