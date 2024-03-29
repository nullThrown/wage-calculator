const Entries = require('../../models/Entries');
const mongoose = require('mongoose');
const getActiveCompanyIds = require('../../services/queries/user/company');
const calculateData = require('../../services/calculate/calculateData');
const {
  getAllActiveEntries,
  getAllEntriesByCompany,
} = require('../../services/queries/entry/overview');

const getOverviewData = async (req, res, next) => {
  try {
    const { filter } = req.params;
    const userId = mongoose.Types.ObjectId(req.user.id);
    let entries;

    if (filter === 'all') {
      entries = await Entries.aggregate([
        {
          $match: { user: userId },
        },
      ]);
    } else if (filter === 'active') {
      const activeCompanyIds = await getActiveCompanyIds(userId);

      entries = await getAllActiveEntries(userId, activeCompanyIds);
    } else {
      const companyId = mongoose.Types.ObjectId(filter);
      entries = await getAllEntriesByCompany(userId, companyId);
    }
    const overviewData = calculateData(entries[0].data);
    res.status(200).json(overviewData);
  } catch (err) {
    next(err);
  }
};

module.exports = getOverviewData;
