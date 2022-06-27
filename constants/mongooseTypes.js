const requiredStr = { type: String, required: true, trim: true };
const requiredNum = { type: Number, required: true, trim: true };
const requiredBool = { type: Boolean, required: true, trim: true };
const currentTime = { type: Date, default: Date.now };
const requiredDate = { type: Date, required: true };

module.exports = {
  requiredStr,
  requiredNum,
  requiredBool,
  currentTime,
  requiredDate,
};
