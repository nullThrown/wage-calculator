const mongoose = require('mongoose');

const requiredStr = { type: String, required: true, trim: true };
const requiredNum = { type: Number, required: true };
const requiredBool = { type: Boolean, required: true };
const currentTime = { type: Date, default: Date.now };
const requiredDate = { type: Date, required: true };
const requiredMongoId = { type: mongoose.Types.ObjectId, required: true };

module.exports = {
  requiredStr,
  requiredNum,
  requiredBool,
  currentTime,
  requiredDate,
  requiredMongoId,
};
