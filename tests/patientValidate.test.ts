import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import Patient from '../src/models/patient.model';
import Doctor from '../src/models/doctor.model';
import IdType from '../src/models/idType.model';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('POST /api/patient/validate', () => {
    beforeEach(async () => {
        await Doctor.destroy({ where: {}, truncate: true, cascade: true });
        await IdType.destroy({ where: {}, truncate: true, cascade: true });

        await Doctor.bulkCreate([
            {
                id: 1,
                name: 'Dr. John Smith',
                phone: '1234567890',
                email: 'johnsmith@example.com',
                speciality: 'Cardiologist',
                imageUrl: 'http://example.com/johnsmith.jpg',
            },
            {
                id: 2,
                name: 'Dr. Emily Brown',
                phone: '0987654321',
                email: 'emilybrown@example.com',
                speciality: 'Neurologist',
                imageUrl: 'http://example.com/emilybrown.jpg',
            },
        ]);

        await IdType.bulkCreate([
            { id: 1, title: 'Passport' },
            { id: 2, title: 'National ID' },
        ]);

        await Patient.bulkCreate([
            {
                fullName: 'John Michael Doe',
                email: 'johndoe@example.com',
                phone: '0123456789',
                dateOfBirth: new Date('1980-01-01'),
                gender: 'male',
                address: '123 Main St',
                occupation: 'Software Engineer',
                emergencyContactName: 'Jane Doe',
                emergencyContactPhone: '9876543210',
                medicalCardNumber: '1234567A',
                ppsNumber: '1234567AB',
                allergies: 'Peanuts',
                currentMedications: 'Ibuprofen',
                familyMedicalHistory: 'Heart disease',
                pastMedicalHistory: 'Asthma',
                identificationNumber: 'ID123456',
                imageDocument: 'http://example.com/image.jpg',
                consentToTreatment: true,
                consentToDisclosure: true,
                agreeToPrivacyPolicy: true,
                primaryCarePhysicianId: 1,
                identificationTypeId: 1,
            },
            {
                fullName: 'Jane Doe',
                email: 'janedoe@example.com',
                phone: '9876543210',
                dateOfBirth: new Date('1990-01-01'),
                gender: 'female',
                address: '456 Elm St',
                occupation: 'Teacher',
                emergencyContactName: 'John Doe',
                emergencyContactPhone: '0123456789',
                medicalCardNumber: '7654321B',
                ppsNumber: '7654321CD',
                allergies: 'None',
                currentMedications: 'None',
                familyMedicalHistory: 'Diabetes',
                pastMedicalHistory: 'None',
                identificationNumber: 'ID765432',
                imageDocument: 'http://example.com/image2.jpg',
                consentToTreatment: true,
                consentToDisclosure: true,
                agreeToPrivacyPolicy: true,
                primaryCarePhysicianId: 2,
                identificationTypeId: 2,
            },
        ]);
    });

    afterEach(async () => {
        await Patient.destroy({ where: {} });
    });

    test('should return 200 for an exact match', async () => {
        const response = await request(app).post('/api/patient/validate').send({
            fullName: 'John Michael Doe',
            email: 'johndoe@example.com',
            phone: '0123456789',
        });

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: 'success',
            message: 'Patient found.',
            redirectTo: '/patients/1',
        });
    });

    test('should return 400 for partial match with incorrect fullName', async () => {
        const response = await request(app).post('/api/patient/validate').send({
            fullName: 'Wrong Name',
            email: 'johndoe@example.com',
            phone: '0123456789',
        });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            status: 'error',
            message: 'Patient exists, but input data is incorrect.',
            conflictingFields: ['fullName'],
        });
    });

    test('should return 404 for no match', async () => {
        const response = await request(app).post('/api/patient/validate').send({
            fullName: 'Nonexistent Patient',
            email: 'nonexistent@example.com',
            phone: '1234567890',
        });

        expect(response.status).toBe(404);
        expect(response.body).toEqual({
            status: 'new_patient',
            message: 'No patient found. Redirect to new patient form.',
            redirectTo: '/patients/new',
        });
    });
});
