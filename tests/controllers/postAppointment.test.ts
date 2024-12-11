import { Request, Response } from 'express';
import { postAppointment } from '../../src/controllers/postAppointment.controller';
import { getPrimaryCarePhysicianId } from '../../src/helpers/getPrimaryCarePhysicainId';
import Appointment from '../../src/models/appointment.model';

jest.mock('../../src/helpers/getPrimaryCarePhysicainId');
jest.mock('../../src/models/appointment.model');

describe('postAppointment Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockGetPrimaryCarePhysicianId: jest.Mock;
    let mockAppointmentCreate: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                doctor: 'dr-emily-carter',
                patientId: 1,
                reasonForAppointment: 'Routine check-up',
                additionalComments: 'Prefers afternoon appointments',
                expectedAppointmentDate: '2024-12-13',
                expectedAppointmentTime: '11:45',
            },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockGetPrimaryCarePhysicianId = getPrimaryCarePhysicianId as jest.Mock;
        mockAppointmentCreate = Appointment.create as jest.Mock;
    });

    it('should create a new appointment and return 201 status', async () => {
        mockGetPrimaryCarePhysicianId.mockResolvedValue(5);
        mockAppointmentCreate.mockResolvedValue({
            id: 1,
            doctorId: 5,
            patientId: 1,
            reasonForAppointment: 'Routine check-up',
            additionalComments: 'Prefers afternoon appointments',
            expectedAppointmentDateAndTime: new Date('2024-12-13T11:45:00.000Z'),
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        await postAppointment(req as Request, res as Response);

        expect(mockGetPrimaryCarePhysicianId).toHaveBeenCalledWith('dr-emily-carter');
        expect(mockAppointmentCreate).toHaveBeenCalledWith({
            doctorId: 5,
            patientId: 1,
            reasonForAppointment: 'Routine check-up',
            additionalComments: 'Prefers afternoon appointments',
            expectedAppointmentDateAndTime: new Date('2024-12-13T11:45:00.000Z'),
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointment created successfully',
            appointment: expect.objectContaining({
                doctorId: 5,
                patientId: 1,
                reasonForAppointment: 'Routine check-up',
                additionalComments: 'Prefers afternoon appointments',
                expectedAppointmentDateAndTime: expect.any(Date),
            }),
        });
    });

    it('should return 404 if the doctor is not found', async () => {
        mockGetPrimaryCarePhysicianId.mockResolvedValue(null);

        await postAppointment(req as Request, res as Response);

        expect(mockGetPrimaryCarePhysicianId).toHaveBeenCalledWith('dr-emily-carter');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Doctor not found' });
    });

    it('should return 400 if the appointment date or time is invalid', async () => {
        req.body.expectedAppointmentDate = 'invalid-date';

        mockGetPrimaryCarePhysicianId.mockResolvedValue(5);

        await postAppointment(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Invalid appointment date or time' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockGetPrimaryCarePhysicianId.mockRejectedValue(new Error('Unexpected error'));

        await postAppointment(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while creating the appointment',
        });
    });
});
