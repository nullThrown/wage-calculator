const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyToken = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');

// ROUTE POST api/entries/create
// DESC create new earning's entry
// ACCESS private
router.post('/create', verifyToken, async (req, res) => {
  const {
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
    const entries = await Entries.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { data: newEntry },
      },
      { returnOriginal: false }
    );

    res.status(201).json(entries.data[entries.data.length - 1]);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/entries/update
// DESC update earning's entry
// ACCESS private
router.post('/update', verifyToken, async (req, res) => {});

// ROUTE GET api/entries/all
// DESC get all entries
// ACCESS private
router.get('/all', verifyToken, async (req, res) => {
  try {
    const entries = await Entries.findOne({ user: req.user.id });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:month/:year/:username
// DESC get all entries by specific month
// ACCESS private
router.get('/:year/:month/:username', verifyToken, async (req, res) => {
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
router.get('/:year/:month/:day', verifyToken, async (req, res) => {
  const { month, year } = req.params;
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

// ROUTE GET api/entries/shift
// DESC get filtered shift data
// ACCESS private
router.get('/shift', verifyToken, async (req, res) => {});

// ROUTE GET api/entries/:id
// DESC get single entry
// ACCESS private
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    const entries = await Entries.findOne({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
