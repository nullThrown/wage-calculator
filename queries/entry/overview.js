const Entries = require('../../models/Entries');

// this filter function needs to take an indeterminate number of company IDs
const getAllActiveEntries = async (userID, activeCompanyIDs) => {
  return await Entries.aggregate([
    { $match: { user: userID } },
    {
      $project: {
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $or: [
                { $eq: ['$$entry.company', activeCompanyIDs[0]] },
                { $eq: ['$$entry.company', activeCompanyIDs[1]] },
              ],
            },
          },
        },
      },
    },
  ]);
};

const getAllEntriesByCompany = async (userID, companyID) => {
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
              $eq: ['$$entry.company', companyID],
            },
          },
        },
      },
    },
  ]);
};

module.exports = {
  getAllActiveEntries,
  getAllEntriesByCompany,
};
