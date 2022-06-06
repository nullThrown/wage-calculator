const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');

// ROUTE POST api/account/create
// DESC update current user's account
// ACCESS private

// this route can be merged into user route & then deleted
router.post('/create', verifyUser, async (req, res) => {
  const { username, hourlyWage, overtimeMultiplier, company } = req.body;
  try {
    const account = {
      hourlyWage,
      overtimeMultiplier,
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

module.exports = router;
