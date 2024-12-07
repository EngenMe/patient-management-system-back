import { getPrimaryCarePhysicianId } from '../src/helpers/getPrimaryCarePhysicianId';
import Doctor from '../src/models/doctor.model';

jest.mock('../src/models/doctor.model');

describe('getPrimaryCarePhysicianId', () => {
    let mockRequest: any;

    beforeEach(() => {
        mockRequest = {
            body: {},
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if primaryCarePhysician is not provided', async () => {
        mockRequest.body.primaryCarePhysician = undefined;

        await expect(getPrimaryCarePhysicianId(mockRequest)).rejects.toThrow(
            'Failed to find the primary care physician ID.'
        );
    });

    it('should throw an error if the doctor is not found', async () => {
        mockRequest.body.primaryCarePhysician = 'mahmoud-ali';

        (Doctor.findOne as jest.Mock).mockResolvedValue(null);

        await expect(getPrimaryCarePhysicianId(mockRequest)).rejects.toThrow(
            'Failed to find the primary care physician ID.'
        );
    });

    it('should return the doctor ID if a doctor is found', async () => {
        mockRequest.body.primaryCarePhysician = 'mahmoud-ali';

        (Doctor.findOne as jest.Mock).mockResolvedValue({ id: '12345' });

        const doctorId = await getPrimaryCarePhysicianId(mockRequest);

        expect(doctorId).toBe('12345');
        expect(Doctor.findOne).toHaveBeenCalledWith({
            where: { name: 'Dr. Mahmoud Ali' },
        });
    });

    it('should log an error and re-throw it if an unexpected error occurs', async () => {
        mockRequest.body.primaryCarePhysician = 'mahmoud-ali';

        (Doctor.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

        console.error = jest.fn();

        await expect(getPrimaryCarePhysicianId(mockRequest)).rejects.toThrow(
            'Failed to find the primary care physician ID.'
        );

        expect(console.error).toHaveBeenCalledWith('Database error');
    });
});
