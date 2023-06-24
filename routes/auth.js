const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyToken = require('../middleware/auth');
const createJwtToken = require('../util/createJwtToken');

const {
  email_already_exists,
  server_error,
  resource_created,
  invalid_credentials,
  token_valid,
} = require('../constants/responseTypes');

// verifyUser middleware will send a not_authorized response if token is invalid
// otherwise, body of callback will run
router.get('/', verifyToken, async (req, res) => {
  res.status(200).json(token_valid);
});

// ROUTE get api/auth/me
// DESC get user with token
// ACCESS public
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'user_not_found' });
    }
    return res.status(200).json(user);
  } catch (err) {
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/auth/register
// DESC register a new user
// ACCESS public
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
            ...resource_created,
            token,
          });
        }
      );
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
