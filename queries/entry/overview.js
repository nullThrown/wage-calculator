const Entries = require('../../models/Entries');

const getAllActiveEntries = async (userID, activeCompanyIDs) => {
  const EqualityChecks = activeCompanyIDs.map((ID) => {
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
              $or: EqualityChecks,
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
