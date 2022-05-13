const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EntrySchema = require('./Entry').schema;

const EntriesSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user' },
    data: [EntrySchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

EntriesSchema.virtual('calculatedData').get(function () {
  // remember totals averaged includes the tipout --
  //  we only neglect tipout when we are trying
  // to determine tip percentage
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
    tipOutWithSalesTaxApp: 0,
    totalSales: 0,
    totalTipOut: 0,
    // includes tip out
    totalPerHour: 0,
    tipPerHour: 0,
    tipPct: 0,
    trueTipPct: 0,
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
      calcData.tipOutWithSalesTaxApp += entry.tipOut;
    }
    calcData.totalSales += entry.totalSales;
    calcData.totalTipOut += entry.tipOut;
  });
  calcData.totalPerHour = calcData.trueTotalEarned / calcData.totalTimeWorked;
  calcData.tipPerHour = calcData.trueTotalTips / calcData.totalTimeWorked;
  calcData.tipPct = calcData.tipsEarnedWithSalesApp / calcData.totalSales;
  calcData.trueTipPct =
    (calcData.tipsEarnedWithSalesApp - calcData.tipOutWithSalesTaxApp) /
    calcData.totalSales;

  return calcData;
});
EntriesSchema.virtual('totalTimeWorked').get(function () {
  return this.data.reduce((acc, value) => {
    return acc + value.timeWorkedDec;
  }, 0);
});
EntriesSchema.virtual('totalTips').get(function () {
  return this.data.reduce((acc, value) => {
    return acc + value.totalTips;
  }, 0);
});
EntriesSchema.virtual('trueTotalTips').get(function () {
  return this.data.reduce((acc, value) => {
    return acc + (value.totalTips - value.tipOut);
  }, 0);
});
EntriesSchema.virtual('totalSales').get(function () {
  return this.data.reduce((acc, value) => {
    if (value.totalSalesApplicable) {
      return acc + value.totalSales;
    } else return acc;
  }, 0);
});
EntriesSchema.virtual('totalTipOut').get(function () {
  return this.data.reduce((acc, value) => {
    return acc + value.tipOut;
  }, 0);
});

module.exports = mongoose.model('entries', EntriesSchema);
