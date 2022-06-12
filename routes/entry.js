const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyToken = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');
const mongoose = require('mongoose');
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

// ROUTE GET api/entries/month/:year/:month
// DESC get all entries by specific month
// ACCESS private

router.get('/month/:year/:month', verifyToken, async (req, res) => {
  // year = full year e.g., 2022
  //month = 1-indexed, no lead 0, e.g., 1,2,3...12
  const { year, month } = req.params;
  try {
    const startDate = new Date(`${year}-0${month}-01T00:00:00Z`);
    const endDate = new Date(year, month, 0);
    endDate.setUTCHours(23, 59, 59, 999);

    const entries = await Entries.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.user.id) } },
      {
        $project: {
          _id: 0,
          data: {
            $filter: {
              input: '$data',
              as: 'entry',
              cond: {
                $and: [
                  { $gte: ['$$entry.shiftDate', startDate] },
                  { $lte: ['$$entry.shiftDate', endDate] },
                ],
              },
            },
          },
        },
      },
    ]);
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});
// $match: { data: { shiftDate: { $gte: startDate, $lt: endDate } } },

// ROUTE GET api/entries/week/:startDate/:endDate
// DESC get all entries by specific week Monday-Sunday both inclusive
// ACCESS private
router.get('/week/:startDate/:endDate', verifyToken, async (req, res) => {
  // date params e.g., 6-13-2022
  const { startDate, endDate } = req.params;

  const startDate2 = new Date(startDate);
  startDate2.setUTCHours(0, 0, 0, 0);
  const endDate2 = new Date(endDate);
  endDate2.setUTCHours(23, 59, 59, 999);

  const entries = await Entries.aggregate([
    { $match: { user: mongoose.Types.ObjectId(userID) } },
    {
      $project: {
        _id: 0,
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $and: [
                { $gte: ['$$entry.shiftDate', startDate] },
                { $lte: ['$$entry.shiftDate', endDate] },
              ],
            },
          },
        },
      },
    },
  ]);
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
