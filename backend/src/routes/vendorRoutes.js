const express = require('express');
const router = express.Router();
const { Vendor } = require('../models');

// Get all vendors
router.get('/', async (req, res) => {
    try {
        const vendors = await Vendor.findAll();
        res.json(vendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Vendor application
router.post('/apply', async (req, res) => {
    try {
        const vendor = await Vendor.create(req.body);
        res.status(201).json(vendor);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
