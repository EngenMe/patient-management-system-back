import { Request, Response } from 'express';
import { scheduleAnAppointment } from '../../src/controllers/scheduleAnAppointment.controller';
import Appointment from '../../src/models/appointment.model';

jest.mock('../../src/models/appointment.model');

describe('scheduleAnAppointment Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockAppointmentFindByPk: jest.Mock;

    beforeEach(() => {
        req = {
            params: { id: '1' },
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockAppointmentFindByPk = Appointment.findByPk as jest.Mock;
    });

    it('should schedule an appointment and return 200 status', async () => {
        const mockAppointment = {
            id: 1,
            status: 'pending',
            save: jest.fn(),
        };

        mockAppointmentFindByPk.mockResolvedValue(mockAppointment);

        await scheduleAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(mockAppointment.status).toBe('scheduled');
        expect(mockAppointment.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointment scheduled successfully',
            appointment: mockAppointment,
        });
    });

    it('should return 404 if the appointment is not found', async () => {
        mockAppointmentFindByPk.mockResolvedValue(null);

        await scheduleAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Appointment not found' });
    });

    it('should return 400 if the appointment is already scheduled', async () => {
        const mockAppointment = {
            id: 1,
            status: 'scheduled',
        };

        mockAppointmentFindByPk.mockResolvedValue(mockAppointment);

        await scheduleAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Appointment is already scheduled' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockAppointmentFindByPk.mockRejectedValue(new Error('Unexpected error'));

        await scheduleAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while scheduling the appointment',
        });
    });
});
