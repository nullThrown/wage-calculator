const express = require('express');
const router = express.Router();
const User = require('../models/User');

//ROUTE POST api/user/register
// DESC register a new user
// ACCESS public
router.post('/register', async (req, res) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({ username: username });
    if (user) {
      res.status(422).json({ error: 'email_already_exists' });
    } else {
      user = new User({ username });
      await user.save();
      res.status(201).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

//ROUTE POST api/user/login
// DESC login a user
// ACCESS public
router.post('/login', async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne(
      { username: username },
      { username: 1, _id: 0 }
    );
    if (!user) {
      res.status(400).json({ error: 'account_does_not_exist' });
    } else {
      res.json(user);
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
