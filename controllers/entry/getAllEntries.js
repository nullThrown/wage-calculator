const Entries = require('../../models/Entries');
const mongoose = require('mongoose');
const getActiveCompanyIds = require('../../services/queries/user/company');
const {
  getAllEntriesQuery,
  getAllActiveEntries,
  getAllEntriesByCompany,
} = require('../../services/queries/entry/overview');

const getAllEntries = async (req, res, next) => {
  try {
    const { filter } = req.params;
    const userId = mongoose.Types.ObjectId(req.user.id);
    let entries;
    if (filter === 'all') {
      entries = await Entries.findOne({ user: userId }).populate('user');
      // entries = await getAllEntriesQuery(userId);
    } else if (filter === 'active') {
      const activeCompanyIds = await getActiveCompanyIds(userId);

      entries = await getAllActiveEntries(userId, activeCompanyIds);
    } else {
      const companyId = mongoose.Types.ObjectId(filter);
      entries = await getAllEntriesByCompany(userId, companyId);
    }
    res.status(200).json(entries);
  } catch (err) {
    next(err);
  }
};

module.exports = getAllEntries;
