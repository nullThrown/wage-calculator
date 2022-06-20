const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EntrySchema = require('./Entry');

const EntriesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    data: [EntrySchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

EntriesSchema.virtual('calcData').get(function () {
  const calcData = {
    totalTimeWorked: 0,
    totalEarned: 0,
    trueTotalEarned: 0,
    totalWages: 0,
    creditTips: 0,
    cashTips: 0,
    totalTips: 0,
    trueTotalTips: 0,
    tipsEarnedWithSalesApp: 0,
    tipOutWithSalesApp: 0,
    totalSales: 0,
    totalTipOut: 0,
  };
  this.data.forEach((entry) => {
    calcData.totalTimeWorked += entry.timeWorkedDec;
    calcData.totalEarned += entry.totalEarned;
    calcData.trueTotalEarned += entry.trueTotalEarned;
    calcData.totalWages += entry.totalWages;
    calcData.creditTips += entry.creditTips;
    calcData.cashTips += entry.cashTips;
    calcData.totalTips += entry.totalTips;
    calcData.trueTotalTips += entry.trueTotalTips;
    if (entry.totalSalesApplicable) {
      calcData.tipsEarnedWithSalesApp += entry.totalTips;
      calcData.tipOutWithSalesApp += entry.tipOut;
    }
    calcData.totalSales += entry.totalSales;
    calcData.totalTipOut += entry.tipOut;
  });

  return calcData;
});
// EntriesSchema.pre('findOneAndUpdate', async function () {
//   let pushedEntry = this.getUpdate();
//   console.log(pushedEntry);

// pushedEntry.$set['data.$.creditTips'];
// if (!pushedEntry) {
//   pushedEntry = this.getUpdate().$set.data;
// }
// pushedEntry.totalTips = +pushedEntry.creditTips + +pushedEntry.cashTips;
// });

module.exports = mongoose.model('entries', EntriesSchema);

// EntriesSchema.virtual('totalPerHour').get(function () {
//   return this.calcData.trueTotalEarned / this.calcData.totalTimeWorked;
// });
// EntriesSchema.virtual('tipPerHour').get(function () {
//   return this.calcData.trueTotalTips / this.calcData.totalTimeWorked;
// });
// EntriesSchema.virtual('tipPct').get(function () {
//   return this.calcData.tipsEarnedWithSalesApp / this.calcData.totalSales;
// });
// EntriesSchema.virtual('trueTipPct').get(function () {
//   return (
//     (this.calcData.tipsEarnedWithSalesApp - this.calcData.tipOutWithSalesApp) /
//     this.calcData.totalSales
//   );
// });
