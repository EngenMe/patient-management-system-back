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
    public gpId!: number;
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
        gpId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'patients',
    }
);

export default Patient;
