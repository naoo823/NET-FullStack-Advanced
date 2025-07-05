// server/src/routes/api.js

const express = require('express'); // <-- ADD THIS LINE
const router = express.Router();

// Mount specific routers on their base paths
router.use('/auth', require('./authRoutes'));
router.use('/users', require('./userRoutes'));
// You can keep adding other resources here
// router.use('/projects', require('./projectRoutes'));

module.exports = router;