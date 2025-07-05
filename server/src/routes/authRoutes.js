const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Import our new validation middleware
const {
  validate,
  registerValidationRules,
  loginValidationRules,
} = require('../middleware/validator');

// Apply the validation rules before the controller logic
router.post('/register', registerValidationRules(), validate, registerUser);
router.post('/login', loginValidationRules(), validate, loginUser);

module.exports = router;