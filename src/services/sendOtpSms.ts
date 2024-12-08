import AWS from 'aws-sdk';

const sns = new AWS.SNS({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
});

export const sendOtpSms = async (otp: string, phoneNumber: string) => {
    try {
        const params = {
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        };

        await sns.publish(params).promise();
    } catch (error) {
        console.error('Error sending SMS:', error);
        throw new Error('Failed to send OTP SMS');
    }
};
