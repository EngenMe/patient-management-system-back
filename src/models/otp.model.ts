import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Patient from './patient.model';

class OTP extends Model {
    public id!: number;
    public otpNumber!: string;
    public patientId!: number;
}

OTP.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        otpNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id',
            },
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'otps',
        timestamps: true,
    }
);

export default OTP;
