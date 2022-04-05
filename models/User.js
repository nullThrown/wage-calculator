const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  currentTime,
} = require('./fieldTypes');
const userSchema = new Schema(
  {
    username: { type: String, unique: true },
    entries: [
      {
        hoursWorked: requiredNum,
        totalSales: requiredNum,
        hourlyWage: { type: Number, default: 2.13 },
        creditTips: requiredNum,
        cashTips: requiredNum,
        tipPct: requiredNum,
        tipOut: requiredNum,
        actualTipPct: requiredNum,
        shiftType: requiredStr,
        brunch: requiredBool,
        createdAt: currentTime,
        updatedAt: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', userSchema);
