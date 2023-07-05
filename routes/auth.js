const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const registerUser = require('../controllers/auth/registerUser');
const loginUser = require('../controllers/auth/loginUser');
const { token_valid } = require('../constants/responseTypes');
const validateLogin = require('../middleware/validation/auth/validateLogin');
const validateRegistration = require('../middleware/validation/auth/validateRegistration');
router.get('/', verifyToken, async (req, res) => {
  res.status(200).json(token_valid);
});

// ROUTE POST api/auth/register
// DESC register a new user
// ACCESS public
router.post('/register', validateRegistration, registerUser);

// ROUTE POST api/auth/login
// DESC login a user
// ACCESS public
router.post('/login', validateLogin, loginUser);

module.exports = router;
