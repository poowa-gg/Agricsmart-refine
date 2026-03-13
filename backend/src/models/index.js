const Farmer = require('./Farmer');
const Vendor = require('./Vendor');
const Program = require('./Program');
const Voucher = require('./Voucher');
const Transaction = require('./Transaction');
const Alert = require('./Alert');
const AcademyProgress = require('./AcademyProgress');

// Program <-> Voucher
Program.hasMany(Voucher, { foreignKey: 'program_id' });
Voucher.belongsTo(Program, { foreignKey: 'program_id' });

// Farmer <-> Voucher
Farmer.hasMany(Voucher, { foreignKey: 'farmer_id' });
Voucher.belongsTo(Farmer, { foreignKey: 'farmer_id' });

// Farmer <-> AcademyProgress
Farmer.hasMany(AcademyProgress, { foreignKey: 'farmer_id' });
AcademyProgress.belongsTo(Farmer, { foreignKey: 'farmer_id' });

// Vendor <-> Voucher (when redeemed)
Vendor.hasMany(Voucher, { foreignKey: 'vendor_id' });
Voucher.belongsTo(Vendor, { foreignKey: 'vendor_id' });

// Transaction associations
Voucher.hasOne(Transaction, { foreignKey: 'voucher_id' });
Transaction.belongsTo(Voucher, { foreignKey: 'voucher_id' });

Vendor.hasMany(Transaction, { foreignKey: 'vendor_id' });
Transaction.belongsTo(Vendor, { foreignKey: 'vendor_id' });

Farmer.hasMany(Transaction, { foreignKey: 'farmer_id' });
Transaction.belongsTo(Farmer, { foreignKey: 'farmer_id' });

const { sequelize } = require('../config/database');

module.exports = {
    Farmer,
    Vendor,
    Program,
    Voucher,
    Transaction,
    Alert,
    AcademyProgress,
    sequelize
};
