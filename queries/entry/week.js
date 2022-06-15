const Entries = require('../../models/Entries');

const getAllWeeklyEntries = async (userID, startDate, endDate) => {
  return await Entries.aggregate([
    { $match: { user: userID } },
    {
      $project: {
        _id: 0,
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $and: [
                { $gte: ['$$entry.shiftDate', startDate] },
                { $lte: ['$$entry.shiftDate', endDate] },
              ],
            },
          },
        },
      },
    },
  ]);
};

const getActiveWeeklyEntries = async (
  userID,
  activeCompanyIDs,
  startDate,
  endDate
) => {
  const createEqCheck = activeCompanyIDs.map((ID) => {
    return { $eq: ['$$entry.company', ID] };
  });

  return await Entries.aggregate([
    { $match: { user: userID } },
    {
      $project: {
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $and: [
                { $or: createEqCheck },
                { $gte: ['$$entry.shiftDate', startDate] },
                { $lte: ['$$entry.shiftDate', endDate] },
              ],
            },
          },
        },
      },
    },
  ]);
};

const getWeeklyEntriesByCompany = async (
  userID,
  companyID,
  startDate,
  endDate
) => {
  return await Entries.aggregate([
    { $match: { user: userID } },
    {
      $project: {
        _id: 0,
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $and: [
                { $gte: ['$$entry.shiftDate', startDate] },
                { $lte: ['$$entry.shiftDate', endDate] },
                { $eq: ['$$entry.company', companyID] },
              ],
            },
          },
        },
      },
    },
  ]);
};

module.exports = {
  getAllWeeklyEntries,
  getActiveWeeklyEntries,
  getWeeklyEntriesByCompany,
};
