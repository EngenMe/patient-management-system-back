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
        speciality: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'doctors',
    }
);

export default Doctor;
