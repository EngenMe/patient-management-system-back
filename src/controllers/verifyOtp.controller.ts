import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import OTP from '../models/otp.model';
import { hashString } from '../helpers/hashString';

export const verifyOtp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { patientId, otp } = req.body;

        if (!patientId || !otp) {
            res.status(400).json({
                success: false,
                message: 'Both patientId and otp are required.',
            });
            return;
        }

        const otpDb = await OTP.findOne({
            where: {
                patientId,
                updatedAt: {
                    [Op.gte]: new Date(Date.now() - 10 * 60 * 1000),
                },
            },
        });

        if (!otpDb) {
            res.status(404).json({
                success: false,
                message: 'No valid OTP found for the given patientId.',
            });
            return;
        }

        const hashedOtp = hashString(otp);
        const isOtpValid = otpDb.otpNumber === hashedOtp;

        if (isOtpValid) {
            res.status(200).json({
                success: true,
                message: 'OTP verified successfully.',
            });
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid OTP.',
            });
        }
    } catch (error) {
        next(error);
    }
};
