import request from 'supertest';
import express from 'express';
import router from '../src/routes/idTypes.routes';
import IdType from '../src/models/idType.model';
import errorHandler from '../src/middlewares/errorHandler';

jest.mock('../src/models/idType.model');

const app = express();
app.use(express.json());
app.use('/', router);
app.use(errorHandler);

describe('ID Type Routes', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /id-types', () => {
        it('should return 200 and a list of ID types when ID types are found', async () => {
            const idTypes = [
                { id: 1, name: 'Passport' },
                { id: 2, name: 'Driving License' },
                { id: 3, name: 'National ID' },
            ];
            (IdType.findAll as jest.Mock).mockResolvedValue(idTypes);

            const response = await request(app).get('/id-types');

            expect(IdType.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                status: 'success',
                message: 'Doctors retrieved successfully.',
                data: idTypes,
            });
        });

        it('should return 404 when no ID types are found', async () => {
            (IdType.findAll as jest.Mock).mockResolvedValue([]);

            const response = await request(app).get('/id-types');

            expect(IdType.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(404);
            expect(response.body).toEqual({
                status: 'error',
                message: 'No doctors found.',
            });
        });

        it('should handle errors and call the error handler', async () => {
            const error = new Error('Database error');
            (IdType.findAll as jest.Mock).mockRejectedValue(error);

            const response = await request(app).get('/id-types');

            expect(IdType.findAll).toHaveBeenCalledTimes(1);
            expect(response.status).toBe(500);
            expect(response.body).toEqual({
                status: 'error',
                message: 'Database error',
            });
        });
    });
});
