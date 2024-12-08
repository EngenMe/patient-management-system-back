import { getIdentificationTypeId } from '../../src/helpers/getIdentificationTypeId';
import IdType from '../../src/models/idType.model';

jest.mock('../../src/models/idType.model');

describe('getIdentificationTypeId', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if identificationType is not provided', async () => {
        await expect(getIdentificationTypeId('')).rejects.toThrow('Identification type is not provided.');
    });

    it('should throw an error if identification type does not exist in the database', async () => {
        (IdType.findOne as jest.Mock).mockResolvedValue(null);

        await expect(getIdentificationTypeId('nonexistentType')).rejects.toThrow(
            'Identification type "nonexistentType" not found.'
        );
    });

    it('should return the ID of the identification type if it exists', async () => {
        const mockRecord = { id: 123, title: 'ValidType' };
        (IdType.findOne as jest.Mock).mockResolvedValue(mockRecord);

        const result = await getIdentificationTypeId('validType');

        expect(IdType.findOne).toHaveBeenCalledWith({
            where: { title: 'ValidType' },
        });
        expect(result).toBe(123);
    });

    it('should capitalize the first letter of the identification type before querying', async () => {
        const mockRecord = { id: 456, title: 'SomeType' };
        (IdType.findOne as jest.Mock).mockResolvedValue(mockRecord);

        const result = await getIdentificationTypeId('someType');

        expect(IdType.findOne).toHaveBeenCalledWith({
            where: { title: 'SomeType' },
        });
        expect(result).toBe(456);
    });
});
