const Entries = require('../../../models/Entries');

const getAllEntriesQuery = async (userId) => {
  return await Entries.aggregate([
    { $match: { user: userId } },
    {
      $lookup: {
        from: 'user',
        let: { userId: '$data.user' },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$_id', '$$userId'],
              },
            },
          },
        ],
        as: 'companydata',
      },
    },
  ]);
};

const getAllActiveEntries = async (userId, activeCompanyIds) => {
  const EqualityChecks = activeCompanyIds.map((Id) => {
    return { $eq: ['$$entry.company', Id] };
  });

  return await Entries.aggregate([
    { $match: { user: userId } },
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

const getAllEntriesByCompany = async (userId, companyID) => {
  return await Entries.aggregate([
    { $match: { user: userId } },
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
  getAllEntriesQuery,
  getAllActiveEntries,
  getAllEntriesByCompany,
};
