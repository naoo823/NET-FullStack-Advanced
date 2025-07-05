// server/src/controllers/userController.js

const asyncHandler = require('express-async-handler'); // <-- ADD THIS LINE
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse'); // Make sure this line is there too

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = asyncHandler(async (req, res, next) => {
  // req.user is attached by the 'protect' middleware
  const user = await User.findById(req.user.id);

  if (user) {
    res.json({
      success: true, // It's good practice to include a success flag
      data: {
        _id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } else {
    // This uses the custom error class
    return next(new ErrorResponse('User not found', 404));
  }
});

module.exports = {
  getUserProfile,
};