import { Request, Response } from 'express';
import { getPrimaryCarePhysicianId } from '../helpers/getPrimaryCarePhysicainId';
import Appointment from '../models/appointment.model';

export const postAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            doctor,
            patientId,
            reasonForAppointment,
            additionalComments,
            expectedAppointmentDate,
            expectedAppointmentTime,
        } = req.body;

        const doctorId = await getPrimaryCarePhysicianId(doctor);

        if (!doctorId) {
            res.status(404).json({ message: 'Doctor not found' });
            return;
        }

        const dateTime = new Date(`${expectedAppointmentDate}T${expectedAppointmentTime}`);

        if (isNaN(dateTime.getTime())) {
            res.status(400).json({ message: 'Invalid appointment date or time' });
            return;
        }

        const newAppointment = await Appointment.create({
            doctorId,
            patientId,
            reasonForAppointment,
            additionalComments,
            expectedAppointmentDateAndTime: dateTime,
        });

        res.status(201).json({ message: 'Appointment created successfully', appointment: newAppointment });
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ message: 'An error occurred while creating the appointment' });
    }
};
