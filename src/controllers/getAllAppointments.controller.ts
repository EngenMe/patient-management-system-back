import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit = parseInt(req.query.limit as string) || 5;
        const page = parseInt(req.query.page as string) || 1;
        const offset = (page - 1) * limit;

        const { count, rows: appointments } = await Appointment.findAndCountAll({
            limit,
            offset,
        });

        if (!appointments.length) {
            res.status(404).json({ message: 'No appointments found' });
            return;
        }

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            message: 'Appointments retrieved successfully',
            appointments,
            currentPage: page,
            totalPages,
            totalAppointments: count,
        });
    } catch (error) {
        console.error('Error retrieving appointments:', error);
        res.status(500).json({ message: 'An error occurred while retrieving appointments' });
    }
};
