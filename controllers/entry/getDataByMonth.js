const mongoose = require('mongoose');
const getActiveCompanyIds = require('../../services/queries/user/company');
const calculateData = require('../../services/calculate/calculateData');

const {
  getAllMonthlyEntries,
  getMonthlyEntriesByCompany,
  getActiveMonthlyEntries,
} = require('../../services/queries/entry/month');

const getDataByMonth = async (req, res, next) => {
  try {
    let { year, month, filter } = req.params;
    if (month.length === 1) {
      month = `0${month}`;
    }
    const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
    const endDate = new Date(year, month, 0);
    endDate.setUTCHours(23, 59, 59, 999);
    const userId = mongoose.Types.ObjectId(req.user.id);
    let entries;

    if (filter === 'all') {
      entries = await getAllMonthlyEntries(userId, startDate, endDate);
    } else if (filter === 'active') {
      const activeCompanyIds = await getActiveCompanyIds(userId);

      entries = await getActiveMonthlyEntries(
        userId,
        activeCompanyIds,
        startDate,
        endDate
      );
    } else {
      const companyId = mongoose.Types.ObjectId(filter);
      entries = await getMonthlyEntriesByCompany(
        userId,
        startDate,
        endDate,
        companyId
      );
    }
    const monthData = calculateData(entries[0].data);
    res.status(200).json(monthData);
  } catch (err) {
    next(err);
  }
};

module.exports = getDataByMonth;
