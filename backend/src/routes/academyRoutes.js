const express = require('express');
const router = express.Router();
const { Farmer, AcademyProgress } = require('../models');

// Weightings for AgriScore
const WEIGHT_EDUCATION = 0.4;
const WEIGHT_PARTICIPATION = 0.3;
const WEIGHT_OUTCOME = 0.3;

// Recalculate AgriScore Engine
const calculateAgriScore = async (farmer_id) => {
    try {
        const farmer = await Farmer.findByPk(farmer_id);
        const progressRecords = await AcademyProgress.findAll({ where: { farmer_id } });

        if (!farmer) return null;

        let totalEducation = 0;
        let totalParticipation = 0;
        let totalOutcome = 0;

        let modulesCount = progressRecords.length || 1;

        progressRecords.forEach(record => {
            totalEducation += record.score;
            totalParticipation += (record.completed_blocks / Math.max(record.total_blocks, 1)) * 100;
            totalOutcome += record.status === 'Completed' ? 100 : 50;
        });

        const avgEducation = totalEducation / modulesCount;
        const avgParticipation = totalParticipation / modulesCount;
        const avgOutcome = totalOutcome / modulesCount;

        const agriScore = (
            (WEIGHT_EDUCATION * avgEducation) +
            (WEIGHT_PARTICIPATION * avgParticipation) +
            (WEIGHT_OUTCOME * avgOutcome)
        );

        farmer.education_score = avgEducation;
        farmer.participation_score = avgParticipation;
        farmer.outcome_score = avgOutcome;
        farmer.agri_score = agriScore;

        await farmer.save();
        return agriScore;

    } catch (error) {
        console.error("AgriScore Calculation Error:", error);
        return null;
    }
};


// POST /api/academy/ussd
// MOCK endpoint for USSD/IVR logic tree interaction (Learn-to-Earn Loop)
router.post('/ussd', async (req, res) => {
    try {
        const { phone, interaction_type, answer } = req.body;

        // Find farmer by phone
        const farmer = await Farmer.findOne({ where: { phone } });

        if (!farmer) {
            return res.status(404).json({ success: false, message: 'Farmer not found for this phone number' });
        }

        // Mock USSD response
        let responseMessage = "Welcome to AgriSmart Academy via USSD.\n";
        if (interaction_type === 'quiz') {
            if (answer && answer.toLowerCase() === 'yes') {
                responseMessage = "Correct! You have earned +10 logic points. Your voucher is getting closer to unlock.";
            } else {
                responseMessage = "Not quite right. Question: Should you use NPK fertilizer before raining? Reply YES or NO.";
            }
        }

        res.status(200).json({
            success: true,
            message: responseMessage,
            farmer_id: farmer.id
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// POST /api/academy/complete-block
router.post('/complete-block', async (req, res) => {
    try {
        const { farmer_id, module_name, blocks_completed, total_blocks, score_achieved } = req.body;

        let progress = await AcademyProgress.findOne({ where: { farmer_id, module_name } });

        if (!progress) {
            progress = await AcademyProgress.create({
                farmer_id,
                module_name,
                completed_blocks: blocks_completed,
                total_blocks,
                score: score_achieved,
                status: blocks_completed >= total_blocks ? 'Completed' : 'In Progress',
                completion_date: blocks_completed >= total_blocks ? new Date() : null
            });
        } else {
            progress.completed_blocks = blocks_completed;
            progress.total_blocks = total_blocks;
            progress.score = score_achieved;
            progress.status = blocks_completed >= total_blocks ? 'Completed' : 'In Progress';
            if (progress.status === 'Completed' && !progress.completion_date) {
                progress.completion_date = new Date();
            }
            await progress.save();
        }

        // Trigger AgriScore Engine calculation
        const newAgriScore = await calculateAgriScore(farmer_id);

        res.status(200).json({
            success: true,
            message: 'Block logic saved and AgriScore updated',
            data: progress,
            newAgriScore
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});


// GET /api/academy/progress/:farmer_id
router.get('/progress/:farmer_id', async (req, res) => {
    try {
        const progress = await AcademyProgress.findAll({ where: { farmer_id: req.params.farmer_id } });
        const farmer = await Farmer.findByPk(req.params.farmer_id, {
            attributes: ['agri_score', 'education_score', 'participation_score', 'outcome_score']
        });

        res.status(200).json({
            success: true,
            data: {
                progress,
                scores: farmer
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;
