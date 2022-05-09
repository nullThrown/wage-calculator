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
