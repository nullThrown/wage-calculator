const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');
const createOverviewData = require('../logic/overview');
const createByMonthData = require('../logic/byMonth');

// ROUTE GET api/entries/all
// DESC get all entries
// ACCESS private for now
router.get('/all/:username', verifyUser, async (req, res) => {
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

// ROUTE GET api/entries/:month/:year/:username
// DESC get all entries by specific month
// ACCESS private for now
router.get('/:year/:month/:username', verifyUser, async (req, res) => {
  const { username, month, year } = req.params;
  const startDate = new Date(year, month, 1);
  const endDate = new Date(year, month + 1, 0);
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    // const entries = await Entries.findOne({ user: userId });
    const filters = {
      shiftDate: {
        $gte: startDate,
        $lt: endDate,
      },
    };
    // const entries = await Entries.find({ data: filters }).where(filters);
    // const entries = await Entries.find({
    //   user: userId,
    //   'data.shiftDate': { $gte: startDate, $lte: endDate },
    // });
    // const entries = await Entries.find(
    //   {
    //     user: userId,
    //     'data.shiftDate': { $gte: startDate, $lte: endDate },
    //   },
    //   {
    //     id: userId,
    //     data: {
    //       $elemMatch: {
    //         date: { $gte: startDate, $lte: endDate },
    //       },
    //     },
    //   }
    // );
    const entries = await Entries.find({ user: userId }).where(filters);
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/:id
// DESC get single entries
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

// ROUTE GET api/entries/all
// DESC get all entries combined with all manipulated data
// ACCESS private for now
router.get('/all/analytic/:username', verifyUser, async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username: username });
    const entries = await Entries.findOne({ user: user._id });
    const currentDate = new Date();
    const EntriesByCurrentmonth = entries.data.filter((entry) => {
      return (
        entry.shiftDate.getMonth() === currentDate.getMonth() &&
        entry.shiftDate.getFullYear() === currentDate.getFullYear()
      );
    });

    const overview = createOverviewData(entries, user);
    const currentMonthData = createByMonthData(EntriesByCurrentmonth);

    const responseData = {
      entries,
      overview,
      // currentMonthData,
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/entries/create
// DESC create new earning
// ACCESS private for now
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

// const entries = await Entries.findOneAndUpdate(
//   { user: userId },
//   { $push: { entries: newEntry } },
//   { returnOriginal: false }
// );
