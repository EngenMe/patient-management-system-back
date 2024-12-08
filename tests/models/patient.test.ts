import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import Patient from '../../src/models/patient.model';

dotenv.config();

describe('Patient model validation tests', () => {
    let sequelize: Sequelize;

    beforeAll(async () => {
        const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

        if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASSWORD || !DB_NAME) {
            throw new Error('One or more database environment variables are missing');
        }

        sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
            host: DB_HOST,
            port: Number(DB_PORT),
            dialect: 'postgres',
            logging: false,
        });

        await sequelize.authenticate();
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        if (sequelize) {
            await sequelize.close();
        }
    });

    it('should throw an error if consentToTreatment is false', async () => {
        try {
            await Patient.create({
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                dateOfBirth: new Date('1990-01-01'),
                gender: 'male',
                address: '123 Main St',
                occupation: 'Engineer',
                emergencyContactName: 'Jane Doe',
                emergencyContactPhone: '+0987654321',
                identificationNumber: 'ID12345',
                imageDocument: 'http://example.com/image.png',
                consentToTreatment: false,
                consentToDisclosure: true,
                agreeToPrivacyPolicy: true,
                primaryCarePhysicianId: 1,
                identificationTypeId: 1,
            });
            throw new Error('Validation should have failed but did not');
        } catch (err: any) {
            expect(err.message).toContain('Consent to treatment must be true');
        }
    });

    it('should throw an error if consentToDisclosure is false', async () => {
        try {
            await Patient.create({
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                dateOfBirth: new Date('1990-01-01'),
                gender: 'male',
                address: '123 Main St',
                occupation: 'Engineer',
                emergencyContactName: 'Jane Doe',
                emergencyContactPhone: '+0987654321',
                identificationNumber: 'ID12345',
                imageDocument: 'http://example.com/image.png',
                consentToTreatment: true,
                consentToDisclosure: false,
                agreeToPrivacyPolicy: true,
                primaryCarePhysicianId: 1,
                identificationTypeId: 1,
            });
            throw new Error('Validation should have failed but did not');
        } catch (err: any) {
            expect(err.message).toContain('Consent to disclosure must be true');
        }
    });

    it('should throw an error if agreeToPrivacyPolicy is false', async () => {
        try {
            await Patient.create({
                fullName: 'John Doe',
                email: 'john.doe@example.com',
                phone: '+1234567890',
                dateOfBirth: new Date('1990-01-01'),
                gender: 'male',
                address: '123 Main St',
                occupation: 'Engineer',
                emergencyContactName: 'Jane Doe',
                emergencyContactPhone: '+0987654321',
                identificationNumber: 'ID12345',
                imageDocument: 'http://example.com/image.png',
                consentToTreatment: true,
                consentToDisclosure: true,
                agreeToPrivacyPolicy: false,
                primaryCarePhysicianId: 1,
                identificationTypeId: 1,
            });
            throw new Error('Validation should have failed but did not');
        } catch (err: any) {
            expect(err.message).toContain('Agreement to privacy policy must be true');
        }
    });
});
