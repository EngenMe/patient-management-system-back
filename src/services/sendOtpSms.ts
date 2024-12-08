import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY || '',
        secretAccessKey: process.env.SECRET_ACCESS_KEY || '',
    },
});

export const sendOtpSms = async (otp: string, phoneNumber: string) => {
    try {
        const params = {
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        };

        const command = new PublishCommand(params);
        await snsClient.send(command);
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send OTP SMS');
    }
};
