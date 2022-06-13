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
    test: { type: String },
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
/// solution -- set doc property with values of same doc
UserSchema.pre('save', function (next) {
  this.test = this.username + '-test';
  next();
});
module.exports = mongoose.model('user', UserSchema);
