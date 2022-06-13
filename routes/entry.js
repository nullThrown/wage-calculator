const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyToken = require('../middleware/auth');
const { server_error, resource_updated } = require('../util/responseTypes');
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
router.put('/update', verifyToken, async (req, res) => {
  // check to see that ID and createdAt fields are consistent
  // check to see that updatedAt field is set
  const {
    entryID,
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

  try {
    const user = await Entries.findOneAndUpdate(
      { user: req.user.id, 'data._id': entryID },
      {
        // updating the subdoc with entire object produces an update conflict error
        // $set: { 'data.$': updatedEntry },
        // MongoServerError: Updating the path 'data.$.updatedAt' would create a conflict at 'data.$'
        //  code: 40,
        //  codeName: 'ConflictingUpdateOperators',
        // therefore dot notation is used to update each property

        $set: {
          'data.$.timeWorkedDec': timeWorkedDec,
          'data.$.totalSales': totalSales,
          'data.$.totalSalesApplicable': totalSalesApplicable,
          'data.$.creditTips': creditTips,
          'data.$.cashTips': cashTips,
          'data.$.tipOut': tipOut,
          'data.$.shiftTime': shiftTime,
          'data.$.company': company,
          'data.$.position': position,
          'data.$.hourlyWage': hourlyWage,
          'data.$.specialEvent': specialEvent,
          'data.$.shiftDate': shiftDate,
        },
      }
    );
    res.status(200).json(resource_updated);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/all
// DESC get all entries + overview data
// ACCESS private
router.get('/all/:filter', verifyToken, async (req, res) => {
  const { filter } = req.params;

  const userID = mongoose.Types.ObjectId(req.user.id);

  try {
    let entries;
    if (filter === 'all') {
      entries = await Entries.findOne({ user: req.user.id });
    } else if (filter === 'active') {
      const user = await User.aggregate([
        { $match: { _id: userID } },
        {
          $project: {
            _id: 0,
            companies: {
              $filter: {
                input: '$companies',
                as: 'company',
                cond: { $eq: ['$$company.active', true] },
              },
            },
          },
        },
      ]);

      const activeIDs = user[0].companies.map((company) => {
        return mongoose.Types.ObjectId(company._id);
      });
      // this filter function needs to take an indeterminate number of company IDs
      entries = await Entries.aggregate([
        { $match: { user: userID } },
        {
          $project: {
            data: {
              $filter: {
                input: '$data',
                as: 'entry',
                cond: {
                  $or: [
                    { $eq: ['$$entry.company', activeIDs[0]] },
                    { $eq: ['$$entry.company', activeIDs[1]] },
                  ],
                },
              },
            },
          },
        },
      ]);
    } else {
      const isValidID = mongoose.isObjectIdOrHexString(filter);
      if (!isValidID) {
        const error = new Error(
          'filter is not valid search param or mongoose object ID'
        );
        return res.status(422).json({
          msg: error.message,
        });
      }
      const companyID = mongoose.Types.ObjectId(filter);
      entries = await Entries.aggregate([
        { $match: { user: userID } },
        {
          $project: {
            _id: 0,
            data: {
              $filter: {
                input: '$data',
                as: 'entry',
                cond: {
                  $eq: ['$$entry.company', companyID],
                },
              },
            },
          },
        },
      ]);
    }

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
router.get('/shift', verifyToken, async (req, res) => {
  // make query to get all entries
  // create object to hold data for different filters
  // forEach entries array
  // calculate avg/hr for each filter
  // return calc data object
  try {
    const entries = await Entries.findOne({ user: req.user.id });

    const byDayData = [
      {
        day: 'Sunday',
        avgPerHour: 0,
      },
      {
        day: 'Monday',
        avgPerHour: 0,
      },
      {
        day: 'Tuesday',
        avgPerHour: 0,
      },
      {
        day: 'Wednesday',
        avgPerHour: 0,
      },
      {
        day: 'Thursday',
        avgPerHour: 0,
      },
      {
        day: 'Friday',
        avgPerHour: 0,
      },
      {
        day: 'Saturday',
        avgPerHour: 0,
      },
    ];

    // entry.shiftDate.toLocaleString('en-us', { weekday: 'long' })
    entries.data.forEach((entry) => {
      // if shiftDay
    });
    res.json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});
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
