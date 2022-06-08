const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const {
  email_already_exists,
  server_error,
  resource_created,
  invalid_credentials,
} = require('../util/responseTypes');

// ROUTE POST api/auth/register
// DESC register a new user
// ACCESS public

// might need to initialize entries upon registering
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(422).json(email_already_exists);
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({ username, email, password: hashedPassword });

      const entries = new Entries({ user: user._id });
      await user.save();
      await entries.save();
      res.status(201).json(resource_created);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/auth/login
// DESC login a user
// ACCESS public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json(invalid_credentials);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(invalid_credentials);
    }
    // authsecret
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(
      payload,
      process.env.JWTSECRET,
      { expiresIn: '20d' },
      (err, token) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ msg: 'jwt sign failed' });
        }
        res.json({
          token,
        });
      }
    );
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
