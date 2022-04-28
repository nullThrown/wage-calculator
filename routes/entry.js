const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');

// ROUTE GET api/entries/all
// DESC get all entries
// ACCESS public for now
router.get('/all/:username', verifyUser, async (req, res) => {
  const { username } = req.params;
  try {
    const userId = await User.findOne({ username: username }, { _id: 1 });
    res.status(200).send(userId);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE POST api/entries/create
// DESC create new earning
// ACCESS public for now
router.post('/create', verifyUser, async (req, res) => {
  const {
    username,
    timeWorkedDec,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipPct,
    actualTipPct,
    tipOut,
    shiftTime,
    company,
    position,
    specialEvent,
    shiftDate,
  } = req.body;
  console.log(timeWorkedDec);
  const newEntry = {
    timeWorkedDec,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipPct,
    actualTipPct,
    tipOut,
    shiftTime,
    company,
    position,
    specialEvent,
    shiftDate,
  };

  try {
    const user = await User.findOne({ username: username });
    let entries = await Entries.findOne({ user: user._id });
    if (!entries) {
      entries = new Entries({ user: user._id, entries: newEntry });
      user.entries = entries._id;
      await user.save();
    } else {
      entries.entries.push(newEntry);
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
