import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import crypto from 'crypto';
import OTP from '../../src/models/otp.model';
import { verifyOtp } from '../../src/controllers/verifyOtp.controller';

jest.mock('../../src/models/otp.model');

describe('verifyOtp Controller', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next: NextFunction;

    beforeEach(() => {
        jest.clearAllMocks();

        req = {
            body: {},
        };

        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        next = jest.fn();
    });

    it('should return 400 if patientId or otp is missing', async () => {
        req.body = {};

        await verifyOtp(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Both patientId and otp are required.',
        });
    });

    it('should return 404 if no valid OTP is found', async () => {
        req.body = { patientId: 123, otp: '456789' };

        (OTP.findOne as jest.Mock).mockResolvedValue(null);

        await verifyOtp(req as Request, res as Response, next);

        expect(OTP.findOne).toHaveBeenCalledWith({
            where: {
                patientId: 123,
                updatedAt: {
                    [Op.gte]: expect.any(Date),
                },
            },
        });
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'No valid OTP found for the given patientId.',
        });
    });

    it('should return 401 if the OTP is invalid', async () => {
        req.body = { patientId: 123, otp: '456789' };

        const mockOtpRecord = {
            otpNumber: crypto.createHash('sha256').update('987654').digest('hex'),
        };

        (OTP.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);

        await verifyOtp(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({
            success: false,
            message: 'Invalid OTP.',
        });
    });

    it('should return 200 if the OTP is valid', async () => {
        req.body = { patientId: 123, otp: '456789' };

        const hashedOtp = crypto.createHash('sha256').update('456789').digest('hex');
        const mockOtpRecord = { otpNumber: hashedOtp };

        (OTP.findOne as jest.Mock).mockResolvedValue(mockOtpRecord);

        await verifyOtp(req as Request, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            success: true,
            message: 'OTP verified successfully.',
        });
    });

    it('should call next with an error if the database query fails', async () => {
        req.body = { patientId: 123, otp: '456789' };

        const error = new Error('Database error');
        (OTP.findOne as jest.Mock).mockRejectedValue(error);

        await verifyOtp(req as Request, res as Response, next);

        expect(next).toHaveBeenCalledWith(error);
    });
});
