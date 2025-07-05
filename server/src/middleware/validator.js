const { body, validationResult } = require('express-validator');

// Middleware to run the validation checks
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  // Extract error messages and format them
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    message: 'Validation failed, entered data is incorrect.',
    errors: extractedErrors,
  });
};

// Define the validation rules for user registration
const registerValidationRules = () => {
  return [
    body('name').trim().not().isEmpty().withMessage('Name is required.'),
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .normalizeEmail(),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long.')
      .matches(/\d/)
      .withMessage('Password must contain a number.')
      .matches(/[a-zA-Z]/)
      .withMessage('Password must contain a letter.'),
  ];
};

// Define validation rules for user login
const loginValidationRules = () => {
  return [
    body('email').isEmail().withMessage('Please enter a valid email.').normalizeEmail(),
    body('password').not().isEmpty().withMessage('Password is required.'),
  ];
};

module.exports = {
  validate,
  registerValidationRules,
  loginValidationRules,
};