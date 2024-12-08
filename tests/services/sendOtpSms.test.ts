import { sendOtpSms } from '../../src/services/sendOtpSms';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

jest.mock('@aws-sdk/client-sns', () => {
    const sendMock = jest.fn();
    return {
        SNSClient: jest.fn(() => ({
            send: sendMock,
        })),
        PublishCommand: jest.fn(),
        sendMock,
    };
});

describe('sendOtpSms', () => {
    const phoneNumber = '1234567890';
    const otp = '123456';
    const snsClient = new SNSClient();
    const sendMock = snsClient.send as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an OTP SMS successfully', async () => {
        sendMock.mockResolvedValue({});

        await sendOtpSms(otp, phoneNumber);

        expect(PublishCommand).toHaveBeenCalledWith({
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        });
        expect(sendMock).toHaveBeenCalled();
    });

    it('should throw an error if SNS publish fails', async () => {
        const error = new Error('SNS failure');
        sendMock.mockRejectedValue(error);

        await expect(sendOtpSms(otp, phoneNumber)).rejects.toThrow('Failed to send OTP SMS');

        expect(PublishCommand).toHaveBeenCalledWith({
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        });
        expect(sendMock).toHaveBeenCalled();
    });
});
