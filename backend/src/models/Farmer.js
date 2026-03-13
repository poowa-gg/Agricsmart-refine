const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Farmer = sequelize.define('Farmer', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    farmer_id: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false
    },
    state: DataTypes.STRING,
    lga: DataTypes.STRING,
    village: DataTypes.STRING,
    crop_type: DataTypes.STRING,
    farm_size: DataTypes.FLOAT,
    national_id: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('Active', 'Suspended'),
        defaultValue: 'Active'
    },
    consent_stored: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    agri_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    education_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    participation_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    outcome_score: {
        type: DataTypes.FLOAT,
        defaultValue: 0.0
    }
});

module.exports = Farmer;
