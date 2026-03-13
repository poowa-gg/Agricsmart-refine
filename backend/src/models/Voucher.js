const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Voucher = sequelize.define('Voucher', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    voucher_code: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Issued', 'Redeemed', 'Expired', 'Revoked'),
        defaultValue: 'Issued'
    },
    expiry_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    redemption_date: DataTypes.DATE
});

module.exports = Voucher;
