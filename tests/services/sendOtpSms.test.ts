import { sendOtpSms } from '../../src/services/sendOtpSms';
import AWS from 'aws-sdk';

jest.mock('aws-sdk', () => {
    const promiseMock = jest.fn();
    const publishMock = jest.fn(() => ({
        promise: promiseMock,
    }));

    return {
        SNS: jest.fn(() => ({
            publish: publishMock,
        })),
    };
});

describe('sendOtpSms', () => {
    const phoneNumber = '1234567890';
    const otp = '123456';
    const SNS = new AWS.SNS();
    const publishMock = SNS.publish as jest.Mock;
    const promiseMock = publishMock().promise as jest.Mock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an OTP SMS successfully', async () => {
        promiseMock.mockResolvedValue({});

        await sendOtpSms(otp, phoneNumber);

        expect(publishMock).toHaveBeenCalledWith({
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        });
        expect(promiseMock).toHaveBeenCalled();
    });

    it('should throw an error if SNS publish fails', async () => {
        const error = new Error('SNS failure');
        promiseMock.mockRejectedValue(error);

        await expect(sendOtpSms(otp, phoneNumber)).rejects.toThrow('Failed to send OTP SMS');

        expect(publishMock).toHaveBeenCalledWith({
            Message: `Your OTP code is: ${otp}`,
            PhoneNumber: `+353${phoneNumber.trim().substring(1)}`,
        });
        expect(promiseMock).toHaveBeenCalled();
    });
});
