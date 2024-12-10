import { sendOtpSms } from '../../src/services/sendOtpSms';

jest.mock('twilio', () => {
    const createMock = jest.fn();
    const mockTwilioInstance = {
        messages: {
            create: createMock,
        },
    };
    return {
        Twilio: jest.fn(() => mockTwilioInstance),
        createMock,
    };
});

describe('sendOtpSms', () => {
    const phoneNumber = '1234567890';
    const otp = '123456';
    const createMock = jest.requireMock('twilio').createMock;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should send an OTP SMS successfully', async () => {
        createMock.mockResolvedValue({ sid: 'SM1234567890' });

        await sendOtpSms(otp, phoneNumber);

        expect(createMock).toHaveBeenCalledWith({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+353${phoneNumber.trim().substring(1)}`,
        });
    });

    it('should throw an error if Twilio send fails', async () => {
        const error = new Error('Twilio failure');
        createMock.mockRejectedValue(error);

        await expect(sendOtpSms(otp, phoneNumber)).rejects.toThrow('Failed to send OTP SMS');

        expect(createMock).toHaveBeenCalledWith({
            body: `Your OTP code is: ${otp}`,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: `+353${phoneNumber.trim().substring(1)}`,
        });
    });
});
