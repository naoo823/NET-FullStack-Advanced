const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// This route is now protected. A valid token must be sent in the header.
router.get('/me', protect, getUserProfile);

module.exports = router;