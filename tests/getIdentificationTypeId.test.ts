import { getIdentificationTypeId } from '../src/helpers/getIdentificationTypeId';
import idType from '../src/models/idType.model';

jest.mock('../src/models/idType.model');

describe('getIdentificationTypeId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return the id of the matching identification type', async () => {
        const mockType = { id: 1, title: 'Passport' };
        (idType.findOne as jest.Mock).mockResolvedValue(mockType);

        const result = await getIdentificationTypeId('Passport');

        expect(result).toBe(1);
        expect(idType.findOne).toHaveBeenCalledWith({ where: { title: 'Passport' } });
    });

    it('should throw an error if identification type is not provided', async () => {
        await expect(getIdentificationTypeId('')).rejects.toThrow('Identification type is not provided.');
    });

    it('should throw an error if the identification type is not found', async () => {
        (idType.findOne as jest.Mock).mockResolvedValue(null);

        await expect(getIdentificationTypeId('UnknownType')).rejects.toThrow(
            'Identification type "UnknownType" not found.'
        );
    });

    it('should throw an error if there is a database error', async () => {
        (idType.findOne as jest.Mock).mockRejectedValue(new Error('Database error'));

        await expect(getIdentificationTypeId('Passport')).rejects.toThrow('Database error');
    });
});
