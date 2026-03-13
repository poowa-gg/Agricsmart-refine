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
console.log('Registering routes...');
app.use('/api/farmers', require('./routes/farmerRoutes'));
console.log('Registered /api/farmers');
app.use('/api/vendors', require('./routes/vendorRoutes'));
console.log('Registered /api/vendors');
app.use('/api/programs', require('./routes/programRoutes'));
console.log('Registered /api/programs');
app.use('/api/vouchers', require('./routes/redemptionRoutes'));
console.log('Registered /api/vouchers');
app.use('/api/settlements', require('./routes/settlementRoutes'));
console.log('Registered /api/settlements');
app.use('/api/reports', require('./routes/reportRoutes'));
console.log('Registered /api/reports');
app.use('/api/academy', require('./routes/academyRoutes'));
console.log('Registered /api/academy');

// Basic Route
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', message: 'AgriSmart Backend is running' });
});

// 404 Debugging (Move to end of routes)
app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
        console.log(`404 at ${req.method} ${req.url}`);
        return res.status(404).json({ error: 'Route not found in debug catch-all', url: req.url });
    }
    next();
});

// Database Connection
const { connectDB, sequelize } = require('./config/database');

const http = require('http');

const startServer = async () => {
    try {
        await connectDB();
        // Sync database (for MVP development)
        await sequelize.sync();
        console.log('Database synced');
        
        const server = http.createServer(app);
        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        
        // Keep process alive explicitly
        server.on('error', (e) => {
            console.error('Server error:', e);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();
