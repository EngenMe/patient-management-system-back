import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model';

export const postPatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const newPatient = new Patient(req.body);
        const savedPatient = await newPatient.save();

        res.status(201).json({
            status: 'success',
            data: savedPatient,
        });
    } catch (error) {
        console.error('Error post patient:', error);
        next(error);
    }
};
