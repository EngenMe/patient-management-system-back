import { Request, Response } from 'express';
import Doctor from '../models/doctor.model';

export const getDoctorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            res.status(400).json({ message: 'Invalid doctor ID' });
            return;
        }

        const doctor = await Doctor.findByPk(id);

        if (!doctor) {
            res.status(404).json({ message: 'Doctor not found' });
            return;
        }

        res.status(200).json({ message: 'Doctor retrieved successfully', doctor });
    } catch (error) {
        console.error('Error retrieving doctor:', error);
        res.status(500).json({ message: 'An error occurred while retrieving the doctor' });
    }
};
