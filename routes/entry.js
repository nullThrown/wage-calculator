const express = require('express');
const router = express.Router();
const User = require('../models/User');

//ROUTE GET api/entries/all
// DESC get all entries
// ACCESS public for now
router.get('/all/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const entries = await User.findOne(
      { username: username },
      { entries: 1, _id: 0 }
    );
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'server_error' });
  }
});

//ROUTE POST api/entries/create
// DESC create new earning
// ACCESS public for now
router.post('/create', async (req, res) => {
  const {
    username,
    hoursWorked,
    totalSales,
    creditTips,
    cashTips,
    tipPct,
    tipOut,
    actualTipPct,
    shiftType,
    brunch,
  } = req.body;

  const newEarning = {
    hoursWorked,
    totalSales,
    creditTips,
    cashTips,
    tipPct,
    tipOut,
    actualTipPct,
    shiftType,
    brunch,
  };

  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(422).json({ error: 'account_does_not_exist' });
    } else {
      user.entries.push(newEarning);
      await user.save();
      res.status(201).json(user.entries);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'server_error' });
  }
});

module.exports = router;
