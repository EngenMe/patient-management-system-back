import request from 'supertest';
import app from '../src/app';
import sequelize from '../src/config/database';
import Patient from '../src/models/patient.model';

beforeAll(async () => {
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    await sequelize.close();
});

describe('POST /api/patient/validate', () => {
    beforeEach(async () => {
        await Patient.bulkCreate([
            { fullName: 'John Michael Doe', email: 'johndoe@example.com', phone: '0123456789' },
            { fullName: 'Jane Doe', email: 'janedoe@example.com', phone: '9876543210' },
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
