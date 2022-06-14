const Entries = require('../../models/Entries');

// this filter function needs to take an indeterminate number of company IDs
const getAllActiveEntries = async (userID, activeCompanyIDs) => {
  const createEqCheck = activeCompanyIDs.map((ID) => {
    return { $eq: ['$$entry.company', ID] };
  });

  console.log(createEqCheck);
  return await Entries.aggregate([
    { $match: { user: userID } },
    {
      $project: {
        data: {
          $filter: {
            input: '$data',
            as: 'entry',
            cond: {
              $or: createEqCheck,
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

// [
//   { $eq: ['$$entry.company', activeCompanyIDs[0]] },
//   { $eq: ['$$entry.company', activeCompanyIDs[1]] },
// ],
