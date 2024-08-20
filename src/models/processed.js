
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Processed = sequelize.define('Processed', {
    hash: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    patientId: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
}, {
    timestamps: true,
});

export default Processed;
