const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  currentTime,
} = require('./fieldTypes');
// updatedAt/createdAt will most likely not be needed... we will need to make sure it works first though
const EntrySchema = new Schema(
  {
    timeWorkedDec: requiredNum,
    totalSales: requiredNum,
    totalSalesApplicable: requiredBool,
    creditTips: requiredNum,
    cashTips: requiredNum,
    tipPct: requiredNum,
    actualTipPct: requiredNum,
    tipOut: requiredNum,
    shiftTime: requiredStr,
    company: requiredStr,
    position: requiredStr,
    specialEvent: requiredBool,
    shiftDate: { type: Date },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

EntrySchema.virtual('totalTips').get(function () {
  return this.creditTips + this.cashTips;
});
module.exports = mongoose.model('entry', EntrySchema);
