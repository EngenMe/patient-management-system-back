import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model';

export const getPatientIdByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email } = req.query;

    if (!email || typeof email !== 'string') {
        res.status(400).json({
            status: 'error',
            message: 'Email query parameter is required and must be a valid string.',
        });
        return;
    }

    try {
        const patient = await Patient.findOne({ where: { email } });

        if (!patient) {
            res.status(404).json({
                status: 'error',
                message: 'Patient not found.',
            });
            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Patient ID retrieved successfully.',
            data: { patientId: patient.id },
        });
    } catch (error) {
        console.error('Error fetching patient ID by email:', error);
        next(error);
    }
};
