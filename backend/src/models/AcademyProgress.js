const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const AcademyProgress = sequelize.define('AcademyProgress', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    module_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    completed_blocks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    total_blocks: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    score: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    status: {
        type: DataTypes.ENUM('In Progress', 'Completed'),
        defaultValue: 'In Progress'
    },
    completion_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

module.exports = AcademyProgress;
