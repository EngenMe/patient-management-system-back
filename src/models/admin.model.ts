import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Admin extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public fullName!: string;
    public role!: string;
    public status!: string;
    public lastLogin!: Date | null;
}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [8, 100],
                notEmpty: true,
            },
        },
        fullName: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [3, 100],
                notEmpty: true,
            },
        },
        role: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'admin',
            validate: {
                isIn: [['admin', 'superadmin']],
            },
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: 'active',
            validate: {
                isIn: [['active', 'inactive', 'suspended']],
            },
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'admins',
        timestamps: true,
    }
);

export default Admin;
