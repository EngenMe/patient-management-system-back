import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await Appointment.findAll();

        if (!appointments.length) {
            res.status(404).json({ message: 'No appointments found' });
            return;
        }

        res.status(200).json({ message: 'Appointments retrieved successfully', appointments });
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ message: 'An error occurred while retrieving appointments' });
    }
};
