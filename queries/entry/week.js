const Entries = require('../../models/Entries');
// filters Entries beginning with start date and filter: all, active companies, specific company

const getAllWeeklyEntries = async (userID, earliestDate, latestDate) => {
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
                { $gte: ['$$entry.shiftDate', earliestDate] },
                { $lte: ['$$entry.shiftDate', latestDate] },
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
  earliestDate,
  latestDate
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
                { $gte: ['$$entry.shiftDate', earliestDate] },
                { $lte: ['$$entry.shiftDate', latestDate] },
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
  earliestDate,
  latestDate
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
                { $eq: ['$$entry.company', companyID] },
                { $gte: ['$$entry.shiftDate', earliestDate] },
                { $gte: ['$$entry.shiftDate', latestDate] },
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
