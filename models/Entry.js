const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  requiredMongoId,
} = require('../constants/mongooseTypes');

const EntrySchema = new Schema(
  {
    timeWorkedDec: requiredNum,
    totalSales: requiredNum,
    totalSalesApplicable: requiredBool,
    creditTips: requiredNum,
    cashTips: requiredNum,
    tipOut: requiredNum,
    shiftTime: requiredStr,
    companyId: requiredMongoId,
    companyName: requiredStr,
    position: requiredStr,
    hourlyWage: requiredNum,
    specialEvent: requiredBool,
    shiftDate: requiredNum,
    totalTips: requiredNum,
    trueTotalTips: requiredNum,
    totalWages: requiredNum,
    totalEarned: requiredNum,
    trueTotalEarned: requiredNum,
    totalEarnedPerHour: requiredNum,
    tipPct: { ...requiredNum, default: -1 },
    trueTipPct: { ...requiredNum, default: -1 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

module.exports = EntrySchema;
