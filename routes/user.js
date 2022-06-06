const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const { email_already_exists, server_error } = require('../util/responseTypes');
const verifyToken = require('../middleware/auth');

// ROUTE GET api/user/me
// DESC get current user
// ACCESS private
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE PUT api/user/me/update
// DESC update current user
// ACCESS private

router.put('/me/update', verifyToken, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const foundUser = await User.findOne({ email: email });
    if (foundUser) {
      res.status(409).json(email_already_exists);
    }
    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          username: username,
          email: email,
          password: hashedPassword,
        },
        { returnOriginal: false }
      );
      res.status(200).json(user);
    }
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        username: username,
        email: email,
      },
      { returnOriginal: false }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/user/company/create
// DESC add company to company list
// ACCESS private
router.post('/company/create', verifyToken, async (req, res) => {
  const { name, position, hourlyWage, overtimeMultiplier } = req.body;

  try {
    const newCompany = {
      name,
      position,
      hourlyWage,
      overtimeMultiplier,
    };
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { companies: newCompany },
      },
      { returnOriginal: false }
    );
    res.status(201).json(user.companies[user.companies.length - 1]);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/user/company/update
// DESC update a company from company list
// ACCESS private
router.put('/company/update', verifyToken, async (req, res) => {
  const { companyId, name, position, hourlyWage, overtimeMultiplier } =
    req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'companies._id': companyId },
      {
        $set: {
          'companies.$.name': name,
          'companies.$.position': position,
          'companies.$.hourlyWage': hourlyWage,
          'companies.$.overtimeMultiplier': overtimeMultiplier,
        },
      },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE DELETE api/user/company/delete/:id
// DESC set a companies removed status from company list
// ACCESS private
router.put('/company/remove/set', verifyToken, async (req, res) => {
  const { companyId, value } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'companies._id': companyId },
      {
        $set: {
          'companies.$.isRemoved': value,
        },
      },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
