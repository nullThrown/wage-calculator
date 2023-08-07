const Entries = require('../../models/Entries');
const testPopulate = async (req, res, next) => {
  const userId = req.user.id;
  console.log(userId);
  try {
    const entries = await Entries.find({ user: userId }).populate('user');
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

module.exports = testPopulate;
