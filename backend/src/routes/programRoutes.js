const express = require('express');
const router = express.Router();
const { Program, Voucher, Farmer } = require('../models');
const { generateVoucherCode } = require('../utils/voucherEngine');

// Get all programs
router.get('/', async (req, res) => {
    try {
        const programs = await Program.findAll();
        res.json(programs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create a new program
router.post('/', async (req, res) => {
    try {
        const program = await Program.create(req.body);
        res.status(201).json(program);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Issue vouchers to farmers for a program
router.post('/:id/issue', async (req, res) => {
    const { id } = req.params;
    const { farmerIds, expiryDate } = req.body;

    try {
        const program = await Program.findByPk(id);
        if (!program) return res.status(404).json({ error: 'Program not found' });

        const vouchers = await Promise.all(farmerIds.map(async (farmerId) => {
            const voucherCode = generateVoucherCode();
            return await Voucher.create({
                voucher_code: voucherCode,
                program_id: id,
                farmer_id: farmerId,
                expiry_date: expiryDate || program.end_date
            });
        }));

        res.status(201).json(vouchers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
