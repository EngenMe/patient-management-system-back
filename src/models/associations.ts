import Doctor from './doctor.model';
import Patient from './patient.model';
import IdType from './idType.model';
import OTP from './otp';

const setupAssociations = () => {
    Doctor.hasMany(Patient, { foreignKey: 'primaryCarePhysicianId', as: 'patients' });
    Patient.belongsTo(Doctor, { foreignKey: 'primaryCarePhysicianId', as: 'primaryCarePhysician' });

    IdType.hasMany(Patient, { foreignKey: 'identificationTypeId', as: 'patients' });
    Patient.belongsTo(IdType, { foreignKey: 'identificationTypeId', as: 'identificationType' });

    Patient.hasOne(OTP, { foreignKey: 'patientId', as: 'otp' });
    OTP.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
};

export default setupAssociations;
