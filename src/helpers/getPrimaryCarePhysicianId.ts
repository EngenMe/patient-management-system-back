import { Request } from 'express';
import Doctor from '../models/doctor.model';

export const getPrimaryCarePhysicianId = async (req: Request) => {
    try {
        const { primaryCarePhysician } = req.body;

        if (!primaryCarePhysician) {
            throw new Error('Primary care physician is not provided.');
        }

        const formattedName = primaryCarePhysician
            .split('-')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');

        const doctor = await Doctor.findOne({ where: { name: `Dr. ${formattedName}` } });

        if (!doctor) {
            throw new Error(`Doctor with name "Dr. ${formattedName}" not found.`);
        }

        return doctor.id;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error('An unknown error occurred.');
        }
        throw new Error('Failed to find the primary care physician ID.');
    }
};
