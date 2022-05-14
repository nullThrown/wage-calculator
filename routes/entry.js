const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');

// ROUTE GET api/entries/all
// DESC get all entries + all data
// ACCESS private
router.get('/all/data/:username', verifyUser, async (req, res) => {
  const { username } = req.params;
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    const entries = await Entries.findOne({ user: userId });

    // data by month
    // const entries = await Entries.findOne({ user: userId });
    // data by week
    // const entries = await Entries.findOne({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:month/:year/:username
// DESC get all entries by specific month
// ACCESS private
router.get('/:year/:month/:username', verifyUser, async (req, res) => {
  const { username, month, year } = req.params;
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    // need to create filters that selects entry subdocs between two dates
    // const entries = await Entries.find({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:month/:year/:day/:username
// DESC get all entries by specific week Monday-Sunday
// ACCESS private
router.get('/:year/:month/:day/:username', verifyUser, async (req, res) => {
  const { username, month, year } = req.params;
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    // need to create filter that queries entry subdocs by selected week
    // a given day will be selected and entries from the preceding monday and the following
    // sunday will be selected and returned
    // const entries = await Entries.find({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:id
// DESC get single entry
// ACCESS private
router.get('/:id/:username', verifyUser, async (req, res) => {
  const { username } = req.params;
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    const entries = await Entries.findOne({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/entries/create
// DESC create new earning
// ACCESS private
router.post('/create', verifyUser, async (req, res) => {
  const {
    username,
    timeWorkedDec,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipOut,
    shiftTime,
    company,
    position,
    hourlyWage,
    specialEvent,
    shiftDate,
  } = req.body;

  const newEntry = {
    timeWorkedDec,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipOut,
    shiftTime,
    company,
    position,
    hourlyWage,
    specialEvent,
    shiftDate,
  };

  try {
    const user = await User.findOne({ username: username });
    let entries = await Entries.findOne({ user: user._id });
    if (!entries) {
      entries = new Entries({ user: user._id, data: newEntry });
      user.entries = entries._id;
      await user.save();
    } else {
      entries.data.push(newEntry);
    }
    await entries.save();

    res.status(201).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
