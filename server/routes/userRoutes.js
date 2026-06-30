const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/userController');

// Route: POST /users/register
router.post('/register', registerUser);

// Route: POST /users/login
router.post('/login', loginUser);

module.exports = router;
