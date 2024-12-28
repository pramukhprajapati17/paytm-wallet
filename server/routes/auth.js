const express = require('express');
const { loginUser } = require('../controllers/authController');  // Import the controller
const router = express.Router();

router.post('/login', loginUser);

module.exports = router;