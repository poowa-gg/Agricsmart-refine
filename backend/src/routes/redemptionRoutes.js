const express = require('express');
const router = express.Router();
const { Voucher, Transaction, Vendor, Farmer, Program, Alert } = require('../models');

// Redeem a voucher
router.post('/redeem', async (req, res) => {
    const { voucherCode, vendorId, farmerPhone } = req.body;

    try {
        // 1. Find voucher
        const voucher = await Voucher.findOne({
            where: { voucher_code: voucherCode },
            include: [Farmer, Program]
        });

        if (!voucher) return res.status(404).json({ error: 'Invalid voucher code' });
        if (voucher.status !== 'Issued') return res.status(400).json({ error: `Voucher is ${voucher.status}` });

        // 2. Verify Farmer
        if (voucher.Farmer.phone !== farmerPhone) {
            return res.status(400).json({ error: 'Voucher - Phone mismatch' });
        }

        // 3. Verify Vendor Authorization (Rule: must be in program's approved list)
        if (!voucher.Program.approved_vendors.includes(vendorId)) {
            return res.status(403).json({ error: 'Vendor not authorized for this program' });
        }

        // 4. Check Expiry
        if (new Date() > new Date(voucher.expiry_date)) {
            voucher.status = 'Expired';
            await voucher.save();
            return res.status(400).json({ error: 'Voucher has expired' });
        }

        // 5. Process Redemption
        voucher.status = 'Redeemed';
        voucher.vendor_id = vendorId;
        voucher.redemption_date = new Date();
        await voucher.save();

        const transaction = await Transaction.create({
            voucher_id: voucher.id,
            vendor_id: vendorId,
            farmer_id: voucher.farmer_id,
            amount: voucher.Program.voucher_value
        });

        // Integrity Check (AI/Rule Layer)
        const { runIntegrityCheck } = require('../services/integrityService');
        runIntegrityCheck(transaction); // Run async in background

        res.json({ message: 'Redemption successful', transaction });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
