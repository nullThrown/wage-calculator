const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {
  requiredNum,
  requiredStr,
  requiredBool,
  currentTime,
} = require('../util/mongooseTypes');

const UserSchema = new Schema(
  {
    username: { ...requiredStr, unique: true },
    email: { ...requiredStr, unique: true },
    password: requiredStr,
    companies: [
      {
        name: requiredStr,
        position: requiredStr,
        active: requiredBool,
        hourlyWage: requiredNum,
        overtimeMultiplier: requiredNum,
        startDate: currentTime,
        endDate: { type: Date },
        isRemoved: { type: Boolean, default: false },
      },
    ],
    entries: { type: Schema.Types.ObjectId, ref: 'entries' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
