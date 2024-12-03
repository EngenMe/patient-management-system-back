import { Request, Response, NextFunction } from 'express';
import IdType from '../models/idType.model';

export const getAllIdTypes = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const idTypes = await IdType.findAll();

        if (idTypes.length === 0) {
            res.status(404).json({
                status: 'error',
                message: 'No doctors found.',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Doctors retrieved successfully.',
            data: idTypes,
        });
    } catch (error) {
        console.error('Error retrieving doctors:', error);
        next(error);
    }
};
