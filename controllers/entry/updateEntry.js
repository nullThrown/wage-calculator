const Entries = require('../../models/Entries');
const { resourceUpdated } = require('../../services/responseTypes/success');
const mongoose = require('mongoose');
const User = require('../../models/User');

const updateEntry = async (req, res, next) => {
  try {
    const {
      minutesWorked,
      hoursWorked,
      totalSales,
      totalSalesApplicable,
      creditTips,
      cashTips,
      tipOut,
      shiftTime,
      company,
      specialEvent,
      shiftDate,
    } = req.body;
    // conduct these calculations outside the object
    const userId = mongoose.Types.ObjectId(req.user.id);
    const companyObjectId = mongoose.Types.ObjectId(company);
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
    const { name, position, hourlyWage } = filteredCompany[0].companies[0];
    const timeWorkedDec = +hoursWorked + +minutesWorked / 60;
    const trueTotalEarned =
      +creditTips + +cashTips - tipOut + timeWorkedDec * +hourlyWage;
    const totalEarnedPerHour = trueTotalEarned / timeWorkedDec;
    const totalTips = +creditTips + +cashTips;
    const trueTotalTips = totalTips - +tipOut;
    const totalWages = timeWorkedDec * +hourlyWage;
    const totalEarned = trueTotalTips + totalWages;
    let tipPct, trueTipPct;

    if (totalSalesApplicable) {
      tipPct = totalEarned / +totalSales;
      trueTipPct = trueTotalEarned / +totalSales;
    }
    await Entries.findOneAndUpdate(
      { user: req.user.id, 'data._id': userId },
      {
        $set: {
          'data.$.timeWorkedDec': timeWorkedDec,
          'data.$.totalSales': totalSales,
          'data.$.totalSalesApplicable': totalSalesApplicable,
          'data.$.creditTips': creditTips,
          'data.$.cashTips': cashTips,
          'data.$.tipOut': tipOut,
          'data.$.shiftTime': shiftTime,
          'data.$.company': companyObjectId,
          'data.$.companyName': name,
          'data.$.position': position,
          'data.$.hourlyWage': hourlyWage,
          'data.$.specialEvent': specialEvent,
          'data.$.shiftDate': shiftDate,
          'data.$.totalTips': totalTips,
          'data.$.trueTotalTips': trueTotalTips,
          'data.$.totalWages': totalWages,
          'data.$.totalEarned': totalEarned,
          'data.$.trueTotalEarned': trueTotalEarned,
          'data.$.totalEarnedPerHour': totalEarnedPerHour,
          'data.$.tipPct': tipPct,
          'data.$.trueTipPct': trueTipPct,
        },
      }
    );
    res.status(200).json(resourceUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = updateEntry;
