import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';

export const scheduleAnAppointment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }

        if (appointment.status === 'scheduled') {
            res.status(400).json({ message: 'Appointment is already scheduled' });
            return;
        }

        appointment.status = 'scheduled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment scheduled successfully', appointment });
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ message: 'An error occurred while scheduling the appointment' });
    }
};
