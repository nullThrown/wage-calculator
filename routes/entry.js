const express = require('express');
const router = express.Router();
const User = require('../models/User');
const verifyUser = require('../middleware/auth');
const { server_error } = require('../util/responseTypes');
const Analytics = require('../logic/business');
const createOverviewData = require('../logic/overview');
// ROUTE GET api/entries/all
// DESC get all entries
// ACCESS public for now
router.get('/all/:username', verifyUser, async (req, res) => {
  const { username } = req.params;
  try {
    const entries = await User.findOne(
      { username: username },
      { entries: 1, _id: 0 }
    );
    const newAnalytics = new Analytics(entries);

    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});
router.get('/all/analytics/:username', verifyUser, async(req, res) => {
  const { username } = req.params;
  
  try {
    const user = await User.findOne(
      { username: username },
      { entries: 1 }
    );
    const overviewData = createOverviewData(user.entries); 
    res.status(200).json(overviewData);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
})

// ROUTE POST api/entries/create
// DESC create new earning
// ACCESS public for now
router.post('/create', verifyUser, async (req, res) => {
  console.log(req.body);
  const {
    username,
    timeWorkedDec,
    totalSales,
    creditTips,
    cashTips,
    tipPct,
    actualTipPct,
    tipOut,
    shiftTime,
    company,
    shiftDate,
    createdAt,
  } = req.body;

  const newEntry = {
    timeWorkedDec,
    totalSales,
    creditTips,
    cashTips,
    tipPct,
    actualTipPct,
    tipOut,
    shiftTime,
    company,
    shiftDate,
    createdAt,
  };

  try {
    const user = await User.findOneAndUpdate(
      { username: username },
      { $push: { entries: newEntry } },
      { returnOriginal: false }
    );
    res.status(201).json(user.entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

module.exports = router;
