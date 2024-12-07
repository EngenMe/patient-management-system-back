import IdType from '../models/idType.model';

export const getIdentificationTypeId = async (identificationType: string): Promise<number> => {
    if (!identificationType) {
        throw new Error('Identification type is not provided.');
    }

    const formattedIdentificationType = identificationType.replace(/\b\w/, (char) => char.toUpperCase());

    const identificationRecord = await IdType.findOne({
        where: { title: formattedIdentificationType },
    });

    if (!identificationRecord) {
        throw new Error(`Identification type "${identificationType}" not found.`);
    }

    return identificationRecord.id;
};
