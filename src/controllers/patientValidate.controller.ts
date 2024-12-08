import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model';

export const validatePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fullName, email, phone } = req.body;

        const patient = await Patient.findOne({
            where: {
                $or: [{ email }, { phone }, { fullName }],
            },
        });

        if (patient) {
            const conflictingFields: string[] = [];

            if (patient.email !== email) conflictingFields.push('email');
            if (patient.phone !== phone) conflictingFields.push('phone');
            if (patient.fullName !== fullName) conflictingFields.push('fullName');

            if (conflictingFields.length > 0) {
                res.status(400).json({
                    status: 'error',
                    message: 'Conflict detected in patient data.',
                    conflictingFields,
                });
                return;
            }

            res.status(200).json({
                status: 'success',
                message: 'Patient found and all fields match.',
            });
            return;
        }

        res.status(404).json({
            status: 'new_patient',
            message: 'No patient found. Redirect to new patient form.',
            redirectTo: '/patients/new',
        });
    } catch (error) {
        console.error('Error validating patient:', error);
        next(error);
    }
};
