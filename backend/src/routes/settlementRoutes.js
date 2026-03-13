const express = require('express');
const router = express.Router();
const { Transaction, Vendor, sequelize } = require('../models');

// Generate settlement instructions for a batch
router.post('/generate-batch', async (req, res) => {
    try {
        console.log('Fetching verified transactions for settlement...');
        const transactions = await Transaction.findAll({
            where: { status: 'Verified' },
            include: [{ model: Vendor }]
        });
        console.log(`Found ${transactions.length} verified transactions.`);

        // Group by vendor
        const settlements = transactions.reduce((acc, tx) => {
            const vendorId = tx.vendor_id;
            if (!tx.Vendor) {
                console.warn(`Transaction ${tx.id} has no associated vendor.`);
                return acc;
            }

            if (!acc[vendorId]) {
                acc[vendorId] = {
                    vendor_id: vendorId,
                    business_name: tx.Vendor.business_name || 'Unknown Vendor',
                    account_number: tx.Vendor.account_number || 'N/A',
                    bank_name: tx.Vendor.bank_name || 'N/A',
                    total_amount: 0,
                    transaction_ids: []
                };
            }
            acc[vendorId].total_amount += parseFloat(tx.amount);
            acc[vendorId].transaction_ids.push(tx.id);
            return acc;
        }, {});

        const batch = Object.values(settlements);
        res.json({ batch_id: Date.now(), instructions: batch });

    } catch (error) {
        console.error('Error generating settlement batch:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
