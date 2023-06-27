const Entries = require('../../models/Entries');
const { server_error } = require('../../constants/responseTypes');

// doesn't filter with entryId but returns entire entry list
const getSingleEntry = async (req, res) => {
  const userId = req.user.id;

  try {
    const entries = await Entries.findOne({ user: userId });
    res.status(200).json(entries);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = getSingleEntry;
