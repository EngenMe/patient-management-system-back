import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';

export const cancelAnAppointment = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            res.status(404).json({ message: 'Appointment not found' });
            return;
        }

        if (appointment.status === 'cancelled') {
            res.status(400).json({ message: 'Appointment is already cancelled' });
            return;
        }

        appointment.status = 'cancelled';
        await appointment.save();

        res.status(200).json({ message: 'Appointment cancelled successfully', appointment });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'An error occurred while cancelling the appointment' });
    }
};
