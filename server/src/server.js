const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./config/logger');

// Load env vars
dotenv.config();

// --- Environment Variable Validation ---
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter(envVar => !process.env[envVar]);

if (missingEnv.length > 0) {
    logger.error(`FATAL ERROR: Missing required environment variables: ${missingEnv.join(', ')}`);
    process.exit(1);
}

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
    logger.info(`🚀 Server running in ${process.env.NODE_ENV} mode, listening with discipline on port ${PORT}`);
    connectDB();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    logger.error(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});