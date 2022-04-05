const requiredStr = { type: String, required: true, trim: true };
const requiredNum = { type: Number, required: true, trim: true };
const requiredBool = { type: Boolean, required: true, trim: true };
const currentTime = { type: Date, default: Date.now };

module.exports = {
  requiredStr,
  requiredNum,
  requiredBool,
  currentTime,
};
