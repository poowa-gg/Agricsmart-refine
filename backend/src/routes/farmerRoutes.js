const express = require('express');
const router = express.Router();
const { Farmer } = require('../models');

// Get all farmers
router.get('/', async (req, res) => {
    try {
        const farmers = await Farmer.findAll();
        res.json(farmers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Register a farmer
router.post('/register', async (req, res) => {
    try {
        const farmer = await Farmer.create(req.body);
        res.status(201).json(farmer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
