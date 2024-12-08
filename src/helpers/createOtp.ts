import OTP from '../models/otp';
import crypto from 'crypto';

export const createOtp = async (patientId: number) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const encodedOtp = crypto.createHash('sha256').update(otp).digest('hex');

        await OTP.upsert(
            {
                patientId,
                otpNumber: encodedOtp,
            },
            {
                returning: true,
            }
        );

        return otp;
    } catch (error) {
        console.error('Error creating OTP:', error);
        throw new Error('Failed to create OTP');
    }
};
