const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { requiredNum, requiredStr, currentTime } = require('./fieldTypes');
const UserSchema = new Schema(
  {
    username: { type: String, unique: true },
    account: {
      hourlyWage: Number,
      overtimeMultiplier: { type: Number, default: 1.5 },
      company: [{ name: String, active: Boolean, position: String }],
    },
    entries: { type: Schema.Types.ObjectId, ref: 'entries' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
