import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Patient extends Model {
    public id!: number;
    public fullName!: string;
    public email!: string;
    public phone!: string;
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
    },
    {
        sequelize,
        tableName: 'patients',
    }
);

export default Patient;
