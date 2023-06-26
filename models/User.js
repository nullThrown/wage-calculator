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
    test: { type: String },
    companies: [
      {
        name: requiredStr,
        position: requiredStr,
        isActive: requiredBool,
        hourlyWage: requiredNum,
        overtimeMultiplier: requiredNum,
        startDate: currentTime,
        endDate: { type: Date },
        totalSalesApplicable: requiredBool,
        isRemoved: { type: Boolean, default: false },
      },
    ],
    entries: { type: Schema.Types.ObjectId, ref: 'entries' },
  },
  { timestamps: true }
);
/// solution -- set doc property with values of same doc
UserSchema.pre('save', function (next) {
  this.test = this.username + '-test';
  next();
});
module.exports = mongoose.model('user', UserSchema);
