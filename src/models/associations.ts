import Doctor from './doctor.model';
import Patient from './patient.model';
import IdType from './idType.model';

const setupAssociations = () => {
    Doctor.hasMany(Patient, { foreignKey: 'primaryCarePhysicianId', as: 'patients' });
    Patient.belongsTo(Doctor, { foreignKey: 'primaryCarePhysicianId', as: 'primaryCarePhysician' });

    IdType.hasMany(Patient, { foreignKey: 'identificationTypeId', as: 'patients' });
    Patient.belongsTo(IdType, { foreignKey: 'identificationTypeId', as: 'identificationType' });
};

export default setupAssociations;
