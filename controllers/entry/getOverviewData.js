const Entries = require('../../models/Entries');
const { server_error } = require('../../constants/responseTypes');
const mongoose = require('mongoose');
const getActiveCompanyIds = require('../../queries/user/company');
const calculateData = require('../../business/calculateData');
const {
  getAllActiveEntries,
  getAllEntriesByCompany,
} = require('../../queries/entry/overview');

const getOverviewData = async (req, res) => {
  const { filter } = req.params;

  const userId = mongoose.Types.ObjectId(req.user.id);

  try {
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
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = getOverviewData;
