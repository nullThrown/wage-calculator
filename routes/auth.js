const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { registerUser, loginUser } = require('../controllers/auth');
const { token_valid } = require('../constants/responseTypes');

router.get('/', verifyToken, async (req, res) => {
  res.status(200).json(token_valid);
});

// ROUTE POST api/auth/register
// DESC register a new user
// ACCESS public
router.post('/register', registerUser);

// ROUTE POST api/auth/login
// DESC login a user
// ACCESS public
router.post('/login', loginUser);

module.exports = router;
