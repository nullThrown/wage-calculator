const Entries = require('../../models/Entries');

// doesn't filter with entryId but returns entire entry list
const getSingleEntry = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const entries = await Entries.findOne({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

module.exports = getSingleEntry;
