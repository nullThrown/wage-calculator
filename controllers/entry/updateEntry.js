const Entries = require('../../models/Entries');
const {
  server_error,
  resource_updated,
} = require('../../constants/responseTypes');

const updateEntry = async (req, res) => {
  const {
    entryId,
    timeWorkedDec,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipOut,
    shiftTime,
    companyId,
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
      { user: req.user.id, 'data._id': entryId },
      {
        $set: {
          'data.$.timeWorkedDec': timeWorkedDec,
          'data.$.totalSales': totalSales,
          'data.$.totalSalesApplicable': totalSalesApplicable,
          'data.$.creditTips': creditTips,
          'data.$.cashTips': cashTips,
          'data.$.tipOut': tipOut,
          'data.$.shiftTime': shiftTime,
          'data.$.company': companyId,
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
};

module.exports = updateEntry;
