import { Request, Response, NextFunction } from 'express';
import { getIdentificationTypeId } from '../helpers/getIdentificationTypeId';
import { getPrimaryCarePhysicianId } from '../helpers/getPrimaryCarePhysicainId';

export const normalizePatientData = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { body, file } = req;
        if (!file) throw new Error('No file uploaded');

        const allowedFields = [
            'fullName',
            'email',
            'phone',
            'dateOfBirth',
            'gender',
            'address',
            'occupation',
            'emergencyContactName',
            'emergencyContactPhone',
            'medicalCardNumber',
            'ppsNumber',
            'allergies',
            'currentMedications',
            'familyMedicalHistory',
            'pastMedicalHistory',
            'identificationNumber',
            'imageDocument',
            'consentToTreatment',
            'consentToDisclosure',
            'agreeToPrivacyPolicy',
        ];

        const reshapedData = allowedFields.reduce(
            (acc, field) => {
                if (body[field] !== undefined) acc[field] = body[field];
                return acc;
            },
            {} as Record<string, any>
        );

        req.body = {
            ...reshapedData,
            primaryCarePhysicianId: await getPrimaryCarePhysicianId(body.primaryCarePhysician),
            identificationTypeId: await getIdentificationTypeId(body.identificationType),
        };

        next();
    } catch (error) {
        console.error('Error reshaping patient data:', error);
        res.status(400).json({ message: (error as Error).message });
    }
};
