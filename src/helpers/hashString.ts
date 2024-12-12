import crypto from 'crypto';

export const hashString = (otp: string) => {
    return crypto.createHash('sha256').update(otp).digest('hex');
};
