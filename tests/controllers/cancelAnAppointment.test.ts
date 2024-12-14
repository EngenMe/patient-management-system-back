import { Request, Response } from 'express';
import { cancelAnAppointment } from '../../src/controllers/cancelAnAppointment.controller';
import Appointment from '../../src/models/appointment.model';

jest.mock('../../src/models/appointment.model');

describe('cancelAnAppointment Controller', () => {
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

    it('should cancel an appointment and return 200 status', async () => {
        const mockAppointment = {
            id: 1,
            status: 'pending',
            save: jest.fn(),
        };

        mockAppointmentFindByPk.mockResolvedValue(mockAppointment);

        await cancelAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(mockAppointment.status).toBe('cancelled');
        expect(mockAppointment.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointment cancelled successfully',
            appointment: mockAppointment,
        });
    });

    it('should return 404 if the appointment is not found', async () => {
        mockAppointmentFindByPk.mockResolvedValue(null);

        await cancelAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ message: 'Appointment not found' });
    });

    it('should return 400 if the appointment is already cancelled', async () => {
        const mockAppointment = {
            id: 1,
            status: 'cancelled',
        };

        mockAppointmentFindByPk.mockResolvedValue(mockAppointment);

        await cancelAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'Appointment is already cancelled' });
    });

    it('should return 500 if an unexpected error occurs', async () => {
        mockAppointmentFindByPk.mockRejectedValue(new Error('Unexpected error'));

        await cancelAnAppointment(req as Request, res as Response);

        expect(mockAppointmentFindByPk).toHaveBeenCalledWith('1');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while cancelling the appointment',
        });
    });
});
