const express = require('express');
const router = express.Router();
const { Transaction, Farmer, Vendor, Program, Alert } = require('../models');

// Generate Evidence Pack summary
router.get('/summary', async (req, res) => {
    try {
        const totalFarmers = await Farmer.count();
        const totalVendors = await Vendor.count();
        const totalRedemptions = await Transaction.count();
        const totalAlerts = await Alert.count({ where: { status: 'New' } });

        const recentTransactions = await Transaction.findAll({
            limit: 10,
            order: [['timestamp', 'DESC']],
            include: [Farmer, Vendor]
        });

        res.json({
            metrics: {
                totalFarmers,
                totalVendors,
                totalRedemptions,
                totalAlerts
            },
            recentTransactions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
