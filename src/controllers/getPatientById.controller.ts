import { Request, Response } from 'express';
import Patient from '../models/patient.model';

export const getPatientById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid patient ID' });
            return;
        }

        const patient = await Patient.findByPk(id);

        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }

        res.status(200).json({ message: 'Patient retrieved successfully', patient });
    } catch (error) {
        console.error('Error retrieving patient:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the patient' });
    }
};
