const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  requiredDate,
} = require('../constants/mongooseTypes');

const EntrySchema = new Schema(
  {
    timeWorkedDec: requiredNum,
    totalSales: requiredNum,
    totalSalesApplicable: { type: Boolean },
    creditTips: requiredNum,
    cashTips: requiredNum,
    tipOut: requiredNum,
    shiftTime: requiredStr,
    company: { type: mongoose.Types.ObjectId },
    position: requiredStr,
    hourlyWage: requiredNum,
    specialEvent: { type: Boolean },
    shiftDate: requiredDate,
    totalTips: requiredNum,
    trueTotalTips: requiredNum,
    totalWages: requiredNum,
    totalEarned: requiredNum,
    trueTotalEarned: requiredNum,
    tipPct: { ...requiredNum, default: -1 },
    trueTipPct: { ...requiredNum, default: -1 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);
// EntrySchema.virtual('totalTips').get(function () {
//   return this.creditTips + this.cashTips;
// });
// EntrySchema.virtual('trueTotalTips').get(function () {
//   return this.creditTips + this.cashTips - this.tipOut;
// });
// EntrySchema.virtual('totalWages').get(function () {
//   return this.timeWorkedDec * this.hourlyWage;
// });
// EntrySchema.virtual('totalEarned').get(function () {
//   return this.creditTips + this.cashTips + this.timeWorkedDec * this.hourlyWage;
// });
// EntrySchema.virtual('trueTotalEarned').get(function () {
//   return (
//     this.creditTips +
//     this.cashTips -
//     this.tipOut +
//     this.timeWorkedDec * this.hourlyWage
//   );
// });
// EntrySchema.virtual('tipPct').get(function () {
//   if (this.totalSalesApplicable) {
//     return (this.creditTips + this.cashTips) / this.totalSales;
//   } else return -1;
// });
// EntrySchema.virtual('trueTipPct').get(function () {
//   if (this.totalSalesApplicable) {
//     return (this.creditTips + this.cashTips - this.tipOut) / this.totalSales;
//   } else {
//     return -1;
//   }
// });
module.exports = EntrySchema;
