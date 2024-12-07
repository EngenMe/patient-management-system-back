import Doctor from '../models/doctor.model';

export const getPrimaryCarePhysicianId = async (name: string) => {
    try {
        const formattedName = name
            .replace(/-/g, ' ')
            .replace(/^dr\b/, 'Dr.')
            .replace(/\b\w/g, (char) => char.toUpperCase());

        const doctor = await Doctor.findOne({ where: { name: formattedName } });

        if (!doctor) {
            console.error(`No doctor found with the name: ${formattedName}`);
            return null;
        }

        return doctor.id;
    } catch (error) {
        console.error('Error fetching primary care physician ID:', error);
        throw error;
    }
};
