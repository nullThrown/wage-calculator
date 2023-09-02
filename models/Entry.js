const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { requiredNum, requiredStr } = require('../constants/mongooseTypes');

const EntrySchema = new Schema(
  {
    timeWorkedDec: requiredNum,
    totalSales: requiredNum,
    totalSalesApplicable: { type: Boolean },
    creditTips: requiredNum,
    cashTips: requiredNum,
    tipOut: requiredNum,
    shiftTime: requiredStr,
    company: { type: mongoose.Types.ObjectId, required: true },
    position: requiredStr,
    hourlyWage: requiredNum,
    specialEvent: { type: Boolean, default: false },
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
