const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger');

const app = express();

// --- Security Middleware ---

// Set security HTTP headers
app.use(helmet());

// Enable CORS with specific origin
const corsOptions = {
    origin: process.env.NODE_ENV === 'production' ? 'https://your-frontend-domain.com' : 'http://localhost:5173',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};
app.use(cors(corsOptions));

// --- Core Middleware ---
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: true,
	legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api', limiter); // Apply to all API routes

// --- Routes ---
app.use('/api/health', (req, res) => res.json({ success: true, status: 'UP' }));
app.use('/api', require('./routes/api')); // Main router

// --- Global Error Handler ---
// This MUST be the last middleware
app.use(errorHandler);

module.exports = app;