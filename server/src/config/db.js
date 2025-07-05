// MongoDB connection// server/src/config/db.js

const mongoose = require('mongoose');
const logger = require('./logger'); // Use our advanced logger

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    
    logger.info(`✅ MongoDB Connected: Quality connection established to ${conn.connection.host}`);
  } catch (err) {
    logger.error(`❌ MongoDB Connection Error: ${err.message}`);
    // Exit process with failure
    process.exit(1);
  }
};

// This is the crucial line. Export the function itself, not an object containing it.
module.exports = connectDB;