const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');

// ROUTE POST api/account/create
// DESC create current user's account
// ACCESS private
router.post('/create', verifyUser, async (req, res) => {
  const { username, hourlyWage, overtimeMultiplier, position, company } =
    req.body;
  try {
    const account = {
      hourlyWage,
      overtimeMultiplier,
      position,
      company,
    };
    const user = await User.findOneAndUpdate(
      { username: username },
      { account: account },
      {
        returnOriginal: false,
      }
    );
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/account/edit
// DESC edit current user's account
// ACCESS private
router.post('/edit', verifyUser, async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
