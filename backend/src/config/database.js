const { Sequelize } = require('sequelize');
try {
    require('dotenv').config();
} catch (e) {
    console.warn('dotenv not found, using environment variables or defaults');
}

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './agricsmart.db',
    logging: false,
    define: {
        timestamps: true,
        underscored: true
    }
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('SQLite connected via Sequelize');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDB };
