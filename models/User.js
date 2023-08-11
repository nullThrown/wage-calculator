const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  currentTime,
} = require('../constants/mongooseTypes');

const UserSchema = new Schema(
  {
    username: { ...requiredStr },
    email: { ...requiredStr, unique: true },
    password: requiredStr,
    companies: [
      {
        name: requiredStr,
        position: requiredStr,
        isActive: { type: Boolean, default: true },
        hourlyWage: requiredNum,
        overtimeMultiplier: requiredNum,
        startDate: currentTime,
        endDate: { type: Date },
        totalSalesApplicable: { type: Boolean, default: true },
        isRemoved: { type: Boolean, default: false },
      },
    ],
    entries: { type: Schema.Types.ObjectId, ref: 'entries' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
