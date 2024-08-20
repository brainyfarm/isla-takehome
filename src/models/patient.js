
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Patient = sequelize.define('Patient', {
    patientId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    middleName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    primaryCondition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Patient;
