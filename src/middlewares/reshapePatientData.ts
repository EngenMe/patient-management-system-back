import { Request, Response, NextFunction } from 'express';
import { getImageDocumentPath } from '../helpers/getImageDocumentPath';
import { getPrimaryCarePhysicianId } from '../helpers/getPrimaryCarePhysicianId';
import { getIdentificationTypeId } from '../helpers/getIdentificationTypeId';

export const reshapePatientData = async (req: Request, res: Response, next: NextFunction) => {
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
            'identificationType',
            'identificationNumber',
            'consentToTreatment',
            'consentToDisclosure',
            'agreeToPrivacyPolicy',
            'primaryCarePhysician', // Make sure this field is allowed if you need it
        ];

        const reshapedData = allowedFields.reduce(
            (acc, field) => {
                if (body[field] !== undefined) acc[field] = body[field];
                return acc;
            },
            {} as Record<string, any>
        );

        // Await S3 upload and get the URL
        const imageUrl = await getImageDocumentPath(file.path);

        req.body = {
            ...reshapedData,
            imageDocument: imageUrl, // This is now a string URL
            primaryCarePhysicianId: getPrimaryCarePhysicianId(body.primaryCarePhysician),
            identificationTypeId: getIdentificationTypeId(body.identificationType),
        };

        next();
    } catch (error) {
        console.error('Error reshaping patient data:', error);
        res.status(400).json({ message: (error as Error).message });
    }
};
