const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { requiredNum, requiredStr, currentTime } = require('./fieldTypes');
const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    companies: [
      {
        name: { type: String, required: true },
        position: { type: String, required: true },
        active: { type: Boolean, default: true },
        hourlyWage: { type: Number, required: true },
        overtimeMultiplier: { type: Number, required: true },
        startDate: { type: Date, default: Date.now },
        endDate: { type: Date },
        isRemoved: { type: Boolean, default: false },
      },
    ],
    entries: { type: Schema.Types.ObjectId, ref: 'entries' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('user', UserSchema);
