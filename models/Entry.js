const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  requiredDate,
} = require('../util/mongooseTypes');

const EntrySchema = new Schema(
  {
    timeWorkedDec: requiredNum,
    totalSales: requiredNum,
    totalSalesApplicable: requiredBool,
    creditTips: requiredNum,
    cashTips: requiredNum,
    tipOut: requiredNum,
    shiftTime: requiredStr,
    company: { type: mongoose.Types.ObjectId },
    position: requiredStr,
    hourlyWage: requiredNum,
    specialEvent: requiredBool,
    shiftDate: requiredDate,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
EntrySchema.virtual('totalTips').get(function () {
  return this.creditTips + this.cashTips;
});
EntrySchema.virtual('trueTotalTips').get(function () {
  return this.creditTips + this.cashTips - this.tipOut;
});
EntrySchema.virtual('totalWages').get(function () {
  return this.timeWorkedDec * this.hourlyWage;
});
EntrySchema.virtual('totalEarned').get(function () {
  return this.creditTips + this.cashTips + this.timeWorkedDec * this.hourlyWage;
});
EntrySchema.virtual('trueTotalEarned').get(function () {
  return (
    this.creditTips +
    this.cashTips -
    this.tipOut +
    this.timeWorkedDec * this.hourlyWage
  );
});
EntrySchema.virtual('tipPct').get(function () {
  if (this.totalSalesApplicable) {
    return (this.creditTips + this.cashTips) / this.totalSales;
  } else return -1;
});
EntrySchema.virtual('trueTipPct').get(function () {
  if (this.totalSalesApplicable) {
    return (this.creditTips + this.cashTips - this.tipOut) / this.totalSales;
  } else {
    return -1;
  }
});
module.exports = EntrySchema;
