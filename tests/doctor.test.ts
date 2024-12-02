// doctor.test.ts

import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import router from '../src/routes/doctor.routes';
import Doctor from '../src/models/doctor.model';
import errorHandler from '../src/middlewares/errorHandler';

jest.mock('../src/models/doctor.model');

const app = express();
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

describe('Doctor Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /doctors', () => {
        it('should return 200 and a list of doctors when doctors are found', async () => {
            const doctors = [
                { id: 1, name: 'Dr. Smith' },
                { id: 2, name: 'Dr. Johnson' },
            ];
            (Doctor.findAll as jest.Mock).mockResolvedValue(doctors);

            const response = await request(app).post('/doctors');

            expect(Doctor.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Doctors retrieved successfully.',
                data: doctors,
            });
        });

        it('should return 404 when no doctors are found', async () => {
            (Doctor.findAll as jest.Mock).mockResolvedValue([]);

            const response = await request(app).post('/doctors');

            expect(Doctor.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                status: 'error',
                message: 'No doctors found.',
            });
        });

        it('should handle errors and call the error handler', async () => {
            const error = new Error('Database error');
            (Doctor.findAll as jest.Mock).mockRejectedValue(error);

            const response = await request(app).post('/doctors');

            expect(Doctor.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                status: 'error',
                message: 'Database error',
            });
        });
    });
});
