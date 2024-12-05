import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Doctor extends Model {
    public id!: number;
    public name!: string;
    public phone!: string;
    public email!: string;
    public speciality!: string;
    public imageUrl!: string;
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
            validate: {
                len: [3, 50],
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
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        speciality: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
                notEmpty: true,
            },
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                isUrl: true,
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        tableName: 'doctors',
        timestamps: true,
    }
);

export default Doctor;
