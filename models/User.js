const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { requiredNum, requiredStr, currentTime } = require('./fieldTypes');
const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    account: {
      hourlyWage: Number,
      overtimeMultiplier: { type: Number, default: 1.5 },
      position: String,
      company: String,
    },
    entries: [
      {
        timeWorkedDec: requiredNum,
        totalSales: requiredNum,
        creditTips: requiredNum,
        cashTips: requiredNum,
        tipPct: requiredNum,
        actualTipPct: requiredNum,
        tipOut: requiredNum,
        shiftTime: requiredStr,
        company: requiredStr,
        shiftDate: { type: Date },
        createdAt: currentTime,
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
