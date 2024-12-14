import { Request, Response } from 'express';
import Appointment from '../models/appointment.model';
import { Op } from 'sequelize';

export const getAppointmentStatesCount = async (req: Request, res: Response): Promise<void> => {
    try {
        const [scheduledCount, pendingCount, cancelledCount] = await Promise.all([
            Appointment.count({ where: { status: { [Op.eq]: 'scheduled' } } }),
            Appointment.count({ where: { status: { [Op.eq]: 'pending' } } }),
            Appointment.count({ where: { status: { [Op.eq]: 'cancelled' } } }),
        ]);

        res.status(200).json({
            message: 'Appointment counts retrieved successfully',
            counts: {
                scheduled: scheduledCount,
                pending: pendingCount,
                cancelled: cancelledCount,
            },
        });
    } catch (error) {
        console.error('Error retrieving appointment counts:', error);
        res.status(500).json({ message: 'An error occurred while retrieving appointment counts' });
    }
};
