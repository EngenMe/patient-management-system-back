import { Request, Response, NextFunction } from 'express';
import { getImageDocumentPath } from './getImageDocumentPath';
import { getPrimaryCarePhysicianId } from './getPrimaryCarePhysicianId';

export const reshapePatientData = (req: Request, res: Response, next: NextFunction): void => {
    try {
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
                if (req.body[field] !== undefined) acc[field] = req.body[field];
                return acc;
            },
            {} as Record<string, any>
        );

        req.body = {
            ...reshapedData,
            imageDocument: getImageDocumentPath(req.body.imageDocument),
            primaryCarePhysicianId: getPrimaryCarePhysicianId(req.body.primaryCarePhysician),
            // identificationTypeId: getIdentificationTypeId(req.body.identificationNumber),
        };

        next();
    } catch (error) {
        console.error('Error reshaping patient data:', error);
        res.status(400).json({ message: 'Invalid patient data.' });
    }
};
