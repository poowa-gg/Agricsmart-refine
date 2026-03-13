require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/vendors', require('./routes/vendorRoutes'));
app.use('/api/programs', require('./routes/programRoutes'));
app.use('/api/vouchers', require('./routes/redemptionRoutes'));
app.use('/api/settlements', require('./routes/settlementRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/academy', require('./routes/academyRoutes'));

// Basic Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', message: 'AgriSmart Backend is running' });
});

// Database Connection
const { connectDB, sequelize } = require('./config/database');
connectDB();
// Sync database (for MVP development)
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
