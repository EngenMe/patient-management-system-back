import { Request, Response } from 'express';
import { getAllAppointments } from '../../src/controllers/getAllAppointments.controller';
import Appointment from '../../src/models/appointment.model';

jest.mock('../../src/models/appointment.model');

describe('getAllAppointments Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockAppointmentFindAndCountAll: jest.Mock;

    beforeEach(() => {
        req = {
            query: {
                page: '1',
                limit: '5',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockAppointmentFindAndCountAll = Appointment.findAndCountAll as jest.Mock;
    });

    it('should return paginated appointments with a 200 status', async () => {
        const mockAppointments = [
            {
                id: 1,
                doctorId: 5,
                patientId: 1,
                reasonForAppointment: 'Routine check-up',
                additionalComments: 'Prefers afternoon appointments',
                expectedAppointmentDateAndTime: new Date('2024-12-13T11:45:00.000Z'),
                status: 'scheduled',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        mockAppointmentFindAndCountAll.mockResolvedValue({ count: 1, rows: mockAppointments });

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAndCountAll).toHaveBeenCalledWith({
            limit: 5,
            offset: 0,
        });
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointments retrieved successfully',
            appointments: mockAppointments,
            currentPage: 1,
            totalPages: 1,
            totalAppointments: 1,
        });
    });

    it('should return 404 if no appointments are found', async () => {
        mockAppointmentFindAndCountAll.mockResolvedValue({ count: 0, rows: [] });

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAndCountAll).toHaveBeenCalledWith({
            limit: 5,
            offset: 0,
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No appointments found' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockAppointmentFindAndCountAll.mockRejectedValue(new Error('Unexpected error'));

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAndCountAll).toHaveBeenCalledWith({
            limit: 5,
            offset: 0,
        });
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while retrieving appointments',
        });
    });
});
