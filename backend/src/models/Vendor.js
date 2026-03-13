const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Vendor = sequelize.define('Vendor', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    business_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shop_location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    product_category: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bank_name: DataTypes.STRING,
    account_number: DataTypes.STRING,
    account_name: DataTypes.STRING,
    contact_info: DataTypes.STRING,
    status: {
        type: DataTypes.ENUM('Pending', 'Approved', 'Rejected', 'Suspended'),
        defaultValue: 'Pending'
    }
});

module.exports = Vendor;
