import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID || '', process.env.TWILIO_AUTH_TOKEN || '');

export const sendOtpSms = async (otp: string, phoneNumber: string) => {
    try {
        await twilioClient.messages.create({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+353${phoneNumber.trim().substring(1)}`,
        });
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send OTP SMS');
    }
};
