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

// ROUTE GET api/entries/:year/:month
// DESC get all entries by specific month
// ACCESS private
router.get('/:year/:month', verifyToken, async (req, res) => {
  const { year, month } = req.params;
  try {
    //create startDate var from year and month params (e.g., Number: 2022, Number: 6)
    //create endDate var from year and month params (e.g., Number: 2022, Number: 6)
    //find Entries document with user ID
    //query Entries by shiftDate that is >= to startDate && <= endDate
    // return entries
    // entries should have all mongoose virtual calculations done on only the queried subdocs
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:month/:year/:day/
// DESC get all entries by specific week Monday-Sunday both inclusive
// ACCESS private
router.get('/:year/:month/:startDay/:endDay', verifyToken, async (req, res) => {
  const { year, month, startDay, endDay } = req.params;
  //create startDate var from year, month, and startDay params (e.g., Number: 2022, Number: 6, Number: 23)
  //create endDate var from year, month, and endDay params (e.g., Number: 2022, Number: 6, Number: 30)
  //find Entries document with user ID
  //query Entries by shiftDate that is >= to startDate && <= endDate
  // return entries
  // entries should have all mongoose virtual calculations done on only the queried subdocs
  try {
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
