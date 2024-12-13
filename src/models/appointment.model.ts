import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import Doctor from './doctor.model';
import Patient from './patient.model';

class Appointment extends Model {
    public id!: number;
    public doctorId!: number;
    public patientId!: number;
    public reasonForAppointment!: string;
    public additionalComments?: string;
    public expectedAppointmentDateAndTime!: Date;
    public status!: 'scheduled' | 'pending' | 'cancelled';
}

Appointment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        doctorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Doctor,
                key: 'id',
            },
        },
        patientId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,
                key: 'id',
            },
        },
        reasonForAppointment: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        additionalComments: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        expectedAppointmentDateAndTime: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            },
        },
        status: {
            type: DataTypes.ENUM('scheduled', 'pending', 'cancelled'),
            allowNull: false,
            defaultValue: 'pending',
        },
    },
    {
        sequelize,
        tableName: 'appointments',
        timestamps: true,
    }
);

export default Appointment;
