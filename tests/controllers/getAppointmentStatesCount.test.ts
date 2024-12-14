import { Request, Response } from 'express';
import { getAppointmentStatesCount } from '../../src/controllers/getAppointmentStatesCount.controller';
import Appointment from '../../src/models/appointment.model';
import { Op } from 'sequelize';

jest.mock('../../src/models/appointment.model');

describe('getAppointmentStatesCount Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let mockAppointmentCount: jest.Mock;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockAppointmentCount = Appointment.count as jest.Mock;
    });

    it('should return appointment counts by status with a 200 status', async () => {
        mockAppointmentCount.mockResolvedValueOnce(10).mockResolvedValueOnce(5).mockResolvedValueOnce(2);

        await getAppointmentStatesCount(req as Request, res as Response);

        expect(mockAppointmentCount).toHaveBeenNthCalledWith(1, { where: { status: { [Op.eq]: 'scheduled' } } });
        expect(mockAppointmentCount).toHaveBeenNthCalledWith(2, { where: { status: { [Op.eq]: 'pending' } } });
        expect(mockAppointmentCount).toHaveBeenNthCalledWith(3, { where: { status: { [Op.eq]: 'cancelled' } } });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            message: 'Appointment counts retrieved successfully',
            counts: {
                scheduled: 10,
                pending: 5,
                cancelled: 2,
            },
        });
    });

    it('should return 500 if an error occurs during count retrieval', async () => {
        mockAppointmentCount.mockRejectedValue(new Error('Database error'));

        await getAppointmentStatesCount(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: 'An error occurred while retrieving appointment counts',
        });
    });
});
