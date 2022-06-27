const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Entries = require('../models/Entries');
const verifyToken = require('../middleware/auth');
const {
  server_error,
  resource_updated,
} = require('../constants/responseTypes');
const mongoose = require('mongoose');
const getActiveCompanies = require('../queries/user/company');
const findWeekPairs = require('../util/findWeekPairs');
const calculateData = require('../business/calculateData');
const {
  getAllActiveEntries,
  getAllEntriesByCompany,
} = require('../queries/entry/overview');

const {
  getAllMonthlyEntries,
  getMonthlyEntriesByCompany,
  getActiveMonthlyEntries,
} = require('../queries/entry/month');

const {
  getAllWeeklyEntries,
  getActiveWeeklyEntries,
  getWeeklyEntriesByCompany,
} = require('../queries/entry/week');

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
    totalTips: +creditTips + +cashTips,
    trueTotalTips: +creditTips + +cashTips - +tipOut,
    totalWages: +timeWorkedDec * +hourlyWage,
    totalEarned: +creditTips + +cashTips + +timeWorkedDec * +hourlyWage,
    trueTotalEarned:
      +creditTips + +cashTips - tipOut + +timeWorkedDec * +hourlyWage,
  };
  if (totalSalesApplicable) {
    newEntry.tipPct = (+creditTips + +cashTips) / +totalSales;
    newEntry.trueTipPct = (+creditTips + +cashTips - +tipOut) / +totalSales;
  }
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
  const totalTips = +creditTips + +cashTips;
  const trueTotalTips = +creditTips + +cashTips - +tipOut;
  const totalWages = +timeWorkedDec * +hourlyWage;
  const totalEarned = +creditTips + +cashTips + +timeWorkedDec * +hourlyWage;
  const trueTotalEarned =
    +creditTips + +cashTips - tipOut + +timeWorkedDec * +hourlyWage;
  console.log(typeof totalSalesApplicable);
  let tipPct;
  let trueTipPct;
  if (JSON.parse(totalSalesApplicable.toLowerCase())) {
    tipPct = (+creditTips + +cashTips) / +totalSales;
    trueTipPct = (+creditTips + +cashTips - +tipOut) / +totalSales;
  } else {
    tipPct = -1;
    trueTipPct = -1;
  }
  try {
    await Entries.findOneAndUpdate(
      { user: req.user.id, 'data._id': entryID },
      {
        // updating the subdoc with entire object produces an update conflict error
        // $set: { 'data.$': updatedEntry }, -> entire object
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
          'data.$.totalTips': totalTips,
          'data.$.trueTotalTips': trueTotalTips,
          'data.$.totalWages': totalWages,
          'data.$.totalEarned': totalEarned,
          'data.$.trueTotalEarned': trueTotalEarned,
          'data.$.tipPct': tipPct,
          'data.$.trueTipPct': trueTipPct,
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
// DESC get overview data
// ACCESS private
router.get('/overview/:filter', verifyToken, async (req, res) => {
  const { filter } = req.params;

  const userID = mongoose.Types.ObjectId(req.user.id);

  try {
    let entries;

    if (filter === 'all') {
      entries = await Entries.aggregate([
        {
          $match: { user: userID },
        },
      ]);
    } else if (filter === 'active') {
      const user = await getActiveCompanies(userID);

      const activeCompanyIDs = user[0].companies.map((company) => {
        return mongoose.Types.ObjectId(company._id);
      });

      entries = await getAllActiveEntries(userID, activeCompanyIDs);
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
      entries = await getAllEntriesByCompany(userID, companyID);
    }
    const overviewData = calculateData(entries[0].data);
    res.status(200).json(overviewData);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/month/:year/:month
// DESC calc data by specific month
// ACCESS private
router.get('/month/:year/:month/:filter', verifyToken, async (req, res) => {
  // year = full year e.g., 2022
  //month = 1-indexed, no lead 0, e.g., 1,2,3...12
  const { year, month, filter } = req.params;
  try {
    const startDate = new Date(`${year}-0${month}-01T00:00:00Z`);
    const endDate = new Date(year, month, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    const userID = mongoose.Types.ObjectId(req.user.id);
    let entries;

    if (filter === 'all') {
      entries = await getAllMonthlyEntries(userID, startDate, endDate);
    } else if (filter === 'active') {
      const user = await getActiveCompanies(userID);

      const activeCompanyIDs = user[0].companies.map((company) => {
        return mongoose.Types.ObjectId(company._id);
      });
      entries = await getActiveMonthlyEntries(
        userID,
        activeCompanyIDs,
        startDate,
        endDate
      );
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
      entries = await getMonthlyEntriesByCompany(
        userID,
        startDate,
        endDate,
        companyID
      );
    }
    const monthData = calculateData(entries[0].data);
    res.status(200).json(monthData);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
});

// ROUTE GET api/entries/week/:date/:filter
// DESC get entries grouped by weeks (mon-sun both inclusive)
// ACCESS private
router.get('/week/:date/:filter', verifyToken, async (req, res) => {
  let { date, filter } = req.params;

  try {
    if (date === 'today') {
      date = new Date();
    }
    const weekPairs = findWeekPairs(date, 4);
    const earliestDate = weekPairs[0][0];
    const latestDate = weekPairs[weekPairs.length - 1][1];
    const userID = mongoose.Types.ObjectId(req.user.id);
    let entries;

    if (filter === 'all') {
      entries = await getAllWeeklyEntries(userID, earliestDate, latestDate);
    } else if (filter === 'active') {
      const user = await getActiveCompanies(userID);

      const activeCompanyIDs = user[0].companies.map((company) => {
        return mongoose.Types.ObjectId(company._id);
      });

      entries = await getAllActiveEntries(
        userID,
        activeCompanyIDs,
        earliestDate,
        latestDate
      );
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
      entries = await getAllEntriesByCompany(
        userID,
        companyID,
        earliestDate,
        latestDate
      );
    }
    let entriesByWeek = weekPairs.map((week) => {
      return {
        startDate: week[0],
        endDate: week[1],
        entries: [],
        calcData: {},
      };
    });
    const { data } = entries[0];

    data.forEach((entry) => {
      entriesByWeek.forEach((week) => {
        if (
          entry.shiftDate.getTime() > week.startDate.getTime() &&
          entry.shiftDate.getTime() < week.endDate.getTime()
        ) {
          week.entries.push(entry);
        }
      });
    });
    // populates calcData fields on entriesByWeek with calcData
    entriesByWeek = entriesByWeek.map((week) => {
      const calcData = calculateData(week.entries);

      return { ...week, calcData };
    });
    res.status(200).json(entriesByWeek);
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
