import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Doctor from './doctor.model';
import IdType from './idType.model';

class Patient extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public phone!: string;
    public dateOfBirth!: Date;
    public gender!: 'male' | 'female';
    public address!: string;
    public occupation!: string;
    public emergencyContactName!: string;
    public emergencyContactPhone!: string;
    public medicalCardNumber?: string;
    public ppsNumber?: string;
    public allergies?: string;
    public currentMedications?: string;
    public familyMedicalHistory?: string;
    public pastMedicalHistory?: string;
    public identificationNumber!: string;
    public imageDocument!: string;
    public consentToTreatment!: boolean;
    public consentToDisclosure!: boolean;
    public agreeToPrivacyPolicy!: boolean;
    public primaryCarePhysicianId!: number;
    public identificationTypeId!: number;
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
            validate: {
                len: [3, 100],
                notEmpty: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: /^[+]?[\d\s-]{10,15}$/,
                notEmpty: true,
            },
        },
        dateOfBirth: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        gender: {
            type: DataTypes.ENUM('male', 'female'),
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 200],
                notEmpty: true,
            },
        },
        occupation: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
                notEmpty: true,
            },
        },
        emergencyContactName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
                notEmpty: true,
            },
        },
        emergencyContactPhone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[+]?[\d\s-]{10,15}$/,
                notEmpty: true,
            },
        },
        medicalCardNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [7, 15],
            },
        },
        ppsNumber: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                is: /^\d{7}[A-Za-z]{1,2}$/,
            },
        },
        allergies: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        currentMedications: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        familyMedicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pastMedicalHistory: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        identificationNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [5, 20],
                notEmpty: true,
            },
        },
        imageDocument: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        consentToTreatment: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isTrue(value: boolean) {
                    if (!value) {
                        throw new Error('Consent to treatment must be true');
                    }
                },
            },
        },
        consentToDisclosure: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isTrue(value: boolean) {
                    if (!value) {
                        throw new Error('Consent to disclosure must be true');
                    }
                },
            },
        },
        agreeToPrivacyPolicy: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                isTrue(value: boolean) {
                    if (!value) {
                        throw new Error('Agreement to privacy policy must be true');
                    }
                },
            },
        },
        primaryCarePhysicianId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Doctor,
                key: 'id',
            },
        },
        identificationTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: IdType,
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'patients',
        timestamps: true,
    }
);

export default Patient;
