const User = require('../../models/User');
const Entries = require('../../models/Entries');
const mongoose = require('mongoose');

const createEntry = async (req, res, next) => {
  try {
    const {
      hoursWorked,
      minutesWorked,
      totalSales,
      totalSalesApplicable,
      creditTips,
      cashTips,
      tipOut,
      shiftTime,
      companyId,
      specialEvent,
    } = req.body;

    let timestamp = req.body.shiftDate;

    // works but sets the date to local time zone
    // this should set the zone to whichever date the node server is running on
    // solution: convert to the timestamp to the date it orginally specified
    shiftDate = new Date(timestamp).toLocaleDateString('en-us');
    const timeWorkedDec = +hoursWorked + +minutesWorked / 60;

    const userId = mongoose.Types.ObjectId(req.user.id);
    const companyObjectId = mongoose.Types.ObjectId(companyId);
    const filteredCompany = await User.aggregate([
      { $match: { _id: userId } },
      {
        $project: {
          _id: 0,
          companies: {
            $filter: {
              input: '$companies',
              as: 'company',
              cond: { $eq: ['$$company._id', companyObjectId] },
            },
          },
        },
      },
    ]);
    const { hourlyWage, position } = filteredCompany[0].companies[0];

    const newEntry = {
      timeWorkedDec,
      totalSales,
      totalSalesApplicable,
      creditTips,
      cashTips,
      tipOut,
      shiftTime,
      company: companyObjectId,
      position,
      hourlyWage,
      specialEvent,
      shiftDate,
      // calc these data outside of the object
      totalTips: +creditTips + +cashTips,
      trueTotalTips: +creditTips + +cashTips - +tipOut,
      totalWages: timeWorkedDec * +hourlyWage,
      totalEarned: +creditTips + +cashTips + timeWorkedDec * +hourlyWage,
      trueTotalEarned:
        +creditTips + +cashTips - tipOut + timeWorkedDec * +hourlyWage,
    };
    // calc these data outside of the object
    if (totalSalesApplicable) {
      newEntry.tipPct = (+creditTips + +cashTips) / +totalSales;
      newEntry.trueTipPct = (+creditTips + +cashTips - +tipOut) / +totalSales;
    }
    const entries = await Entries.findOneAndUpdate(
      { user: req.user.id },
      {
        $push: { data: newEntry },
      },
      { returnOriginal: false }
    );

    res.status(201).json(entries.data[entries.data.length - 1]);
  } catch (err) {
    next(err);
  }
};

module.exports = createEntry;
