import Doctor from './doctor.model';
import Patient from './patient.model';

const setupAssociations = () => {
    Doctor.hasMany(Patient, { foreignKey: 'gpId', as: 'patients' });
    Patient.belongsTo(Doctor, { foreignKey: 'gpId', as: 'gp' });
};

export default setupAssociations;
