import { Request, Response, NextFunction } from 'express';
import Doctor from '../models/doctor.model';

export const getAllDoctors = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const doctors = await Doctor.findAll();

        if (doctors.length === 0) {
            res.status(404).json({
                status: 'error',
                message: 'No doctors found.',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Doctors retrieved successfully.',
            data: doctors,
        });
    } catch (error) {
        console.error('Error retrieving doctors:', error);
        next(error);
    }
};
