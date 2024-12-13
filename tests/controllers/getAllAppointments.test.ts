import { Request, Response } from 'express';
import { getAllAppointments } from '../../src/controllers/getAllAppointments.controller';
import Appointment from '../../src/models/appointment.model';

jest.mock('../../src/models/appointment.model');

describe('getAllAppointments Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockAppointmentFindAll: jest.Mock;

    beforeEach(() => {
        req = {};

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockAppointmentFindAll = Appointment.findAll as jest.Mock;
    });

    it('should return all appointments with a 200 status', async () => {
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

        mockAppointmentFindAll.mockResolvedValue(mockAppointments);

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointments retrieved successfully',
            appointments: mockAppointments,
        });
    });

    it('should return 404 if no appointments are found', async () => {
        mockAppointmentFindAll.mockResolvedValue([]);

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'No appointments found' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockAppointmentFindAll.mockRejectedValue(new Error('Unexpected error'));

        await getAllAppointments(req as Request, res as Response);

        expect(mockAppointmentFindAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while retrieving appointments',
        });
    });
});
