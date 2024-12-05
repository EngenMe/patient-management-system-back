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
            validate: {
                len: [3, 50],
                notEmpty: true,
            },
        },
    },
    {
        sequelize,
        tableName: 'idTypes',
        timestamps: true,
    }
);

export default IdType;
