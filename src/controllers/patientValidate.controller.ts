import { Request, Response, NextFunction } from 'express';
import Patient from '../models/patient.model';

export const validatePatient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { fullName, email, phone } = req.body;

        const patient = await Patient.findOne({ where: { email, phone } });

        if (patient) {
            if (patient.fullName === fullName) {
                res.status(200).json({
                    status: 'success',
                    message: 'Patient found.',
                    redirectTo: `/patients/${patient.id}`,
                });
                return;
            }

            res.status(400).json({
                status: 'error',
                message: 'Patient exists, but input data is incorrect.',
                conflictingFields: ['fullName'],
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
