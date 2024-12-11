import Doctor from './doctor.model';
import Patient from './patient.model';
import IdType from './idType.model';
import OTP from './otp.model';
import Appointment from './appointment.model';

const setupAssociations = () => {
    // Doctor and Patient relationships
    Doctor.hasMany(Patient, { foreignKey: 'primaryCarePhysicianId', as: 'patients' });
    Patient.belongsTo(Doctor, { foreignKey: 'primaryCarePhysicianId', as: 'primaryCarePhysician' });

    // IdType and Patient relationships
    IdType.hasMany(Patient, { foreignKey: 'identificationTypeId', as: 'patients' });
    Patient.belongsTo(IdType, { foreignKey: 'identificationTypeId', as: 'identificationType' });

    // Patient and OTP relationship
    Patient.hasOne(OTP, { foreignKey: 'patientId', as: 'otp' });
    OTP.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });

    // Appointment and Doctor relationships
    Doctor.hasMany(Appointment, { foreignKey: 'doctorId', as: 'appointments' });
    Appointment.belongsTo(Doctor, { foreignKey: 'doctorId', as: 'doctor' });

    // Appointment and Patient relationships
    Patient.hasMany(Appointment, { foreignKey: 'patientId', as: 'appointments' });
    Appointment.belongsTo(Patient, { foreignKey: 'patientId', as: 'patient' });
};

export default setupAssociations;
