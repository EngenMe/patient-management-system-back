import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Doctor extends Model {
    public id!: number;
    public name!: string;
    public phone!: string;
    public email!: string;
    public specialty!: string;
    public qualification!: string;
    public address?: string;
    public yearsOfExperience?: number;
    public availableDays?: string[];
    public profilePicture?: string;
}

Doctor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        specialty: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        qualification: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        yearsOfExperience: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        availableDays: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'doctors',
    }
);

export default Doctor;
