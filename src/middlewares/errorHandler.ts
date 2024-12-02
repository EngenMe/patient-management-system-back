import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Unhandled error:', err);

    res.status(err.status || 500).json({
        status: 'error',
        message: err.message || 'An error occurred.',
    });
};

export default errorHandler;
