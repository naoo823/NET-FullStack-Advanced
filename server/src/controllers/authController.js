const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const ErrorResponse = require('../utils/errorResponse'); // We will create this next

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new ErrorResponse('User with that email already exists', 400));
  }

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 201, res);
});

// @desc    Authenticate a user (login)
// @route   POST /api/auth/login
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});


// Helper function to get token, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  res.status(statusCode).json({
    success: true,
    token,
    data: { name: user.name, email: user.email }
  });
};

module.exports = { registerUser, loginUser };