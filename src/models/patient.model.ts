import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public phone!: string;
    public dateOfBirth!: Date;
    public gender!: 'Male' | 'Female';
    public address!: string;
    public occupation!: string;
    public emergencyContactName!: string;
    public emergencyContactPhone!: string;
    public medicalCardNumber?: string;
    public ppsNumber?: string;
    public gpName?: string;
    public allergies?: string;
    public currentMedications?: string;
    public familyMedicalHistory?: string;
    public pastMedicalHistory?: string;
    public identificationType!: string;
    public identificationNumber!: string;
    public imageDocument?: string;
    public consentToTreatment!: boolean;
    public consentToHealthInfoDisclosure!: boolean;
    public agreeToPrivacyPolicy!: boolean;
}

Patient.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        fullName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female'),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emergencyContactName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        emergencyContactPhone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        medicalCardNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ppsNumber: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gpName: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        allergies: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        currentMedications: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyMedicalHistory: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pastMedicalHistory: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        identificationType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        identificationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageDocument: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        consentToTreatment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        consentToHealthInfoDisclosure: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        agreeToPrivacyPolicy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'patients',
    }
);

export default Patient;
