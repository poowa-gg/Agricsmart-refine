const { Alert, Transaction, Voucher } = require('../models');
const { Op } = require('sequelize');

/**
 * Checks for anomalies in a transaction and creates alerts if rules are triggered.
 * @param {Object} transaction - The recent transaction object
 */
const runIntegrityCheck = async (transaction) => {
    const { vendor_id, farmer_id, voucher_id } = transaction;

    try {
        // Rule 1: High frequency redemption (>10 in 1 hour for a vendor)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        const hourlyRedemptions = await Transaction.count({
            where: {
                vendor_id,
                timestamp: { [Op.gte]: oneHourAgo }
            }
        });

        if (hourlyRedemptions > 10) {
            await Alert.create({
                type: 'HIGH_FREQUENCY_REDEMPTION',
                description: `Vendor ${vendor_id} has exceeded 10 redemptions in the last hour.`,
                severity: 'High',
                reference_id: transaction.id
            });
        }

        // Rule 2: Rapid bursts (<30s between consecutive redemptions for a vendor)
        const lastVendorTx = await Transaction.findOne({
            where: {
                vendor_id,
                id: { [Op.ne]: transaction.id }
            },
            order: [['timestamp', 'DESC']]
        });

        if (lastVendorTx) {
            const diffMs = new Date(transaction.timestamp) - new Date(lastVendorTx.timestamp);
            if (diffMs < 30000) { // 30 seconds
                await Alert.create({
                    type: 'RAPID_BURST_REDEMPTION',
                    description: `Vendor ${vendor_id} redeemed two vouchers within ${Math.round(diffMs / 1000)} seconds.`,
                    severity: 'Medium',
                    reference_id: transaction.id
                });
            }
        }

        // Rule 3: Duplicate Beneficiary Pattern (Same farmer, multiple vouchers for same program)
        // Actually, this should be checked at issuance, but if it happens at redemption:
        const voucher = await Voucher.findByPk(voucher_id);
        const program_id = voucher.program_id;

        const duplicates = await Voucher.count({
            where: {
                farmer_id,
                program_id,
                status: 'Redeemed'
            }
        });

        if (duplicates > 1) {
            await Alert.create({
                type: 'DUPLICATE_BENEFICIARY_REDEMPTION',
                description: `Farmer ${farmer_id} has redeemed multiple vouchers for program ${program_id}.`,
                severity: 'Critical',
                reference_id: transaction.id
            });
        }

    } catch (error) {
        console.error('Integrity check failed:', error);
    }
};

module.exports = { runIntegrityCheck };
