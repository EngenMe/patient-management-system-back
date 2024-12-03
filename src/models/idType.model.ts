import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class IdType extends Model {
    public id!: number;
    public title!: string;
}

IdType.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
    },
    {
        sequelize,
        tableName: 'idTypes',
    }
);

export default IdType;
