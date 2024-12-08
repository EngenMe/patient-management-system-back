import { getPrimaryCarePhysicianId } from '../../src/helpers/getPrimaryCarePhysicainId';
import Doctor from '../../src/models/doctor.model';

jest.mock('../../src/models/doctor.model');

describe('getPrimaryCarePhysicianId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should format the name correctly and return the doctor ID if the doctor exists', async () => {
        const mockDoctor = { id: 101, name: 'Dr. John Smith' };
        (Doctor.findOne as jest.Mock).mockResolvedValue(mockDoctor);

        const result = await getPrimaryCarePhysicianId('dr-john-smith');

        expect(Doctor.findOne).toHaveBeenCalledWith({
            where: { name: 'Dr. John Smith' },
        });
        expect(result).toBe(101);
    });

    it('should return null if the doctor is not found', async () => {
        (Doctor.findOne as jest.Mock).mockResolvedValue(null);

        const result = await getPrimaryCarePhysicianId('dr-jane-doe');

        expect(Doctor.findOne).toHaveBeenCalledWith({
            where: { name: 'Dr. Jane Doe' },
        });
        expect(result).toBeNull();
    });

    it('should handle names with hyphens and format them correctly', async () => {
        const mockDoctor = { id: 202, name: 'Dr. Jane Doe' };
        (Doctor.findOne as jest.Mock).mockResolvedValue(mockDoctor);

        const result = await getPrimaryCarePhysicianId('jane-doe');

        expect(Doctor.findOne).toHaveBeenCalledWith({
            where: { name: 'Jane Doe' },
        });
        expect(result).toBe(202);
    });

    it('should log an error and rethrow it if an exception occurs', async () => {
        const mockError = new Error('Database error');
        (Doctor.findOne as jest.Mock).mockRejectedValue(mockError);

        await expect(getPrimaryCarePhysicianId('dr-james-brown')).rejects.toThrow('Database error');

        expect(console.error).toHaveBeenCalledWith('Error fetching primary care physician ID:', mockError);
    });
});
