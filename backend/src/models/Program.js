const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Program = sequelize.define('Program', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    target_region: DataTypes.STRING,
    voucher_value: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    input_category: DataTypes.STRING,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE,
    approved_vendors: {
        type: DataTypes.JSONB, // Stores list of vendor IDs
        defaultValue: []
    },
    status: {
        type: DataTypes.ENUM('Active', 'Finished', 'Cancelled'),
        defaultValue: 'Active'
    }
});

module.exports = Program;
