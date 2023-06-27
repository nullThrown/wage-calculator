const User = require('../../models/User');

const getActiveCompanies = async (userId) => {
  return await User.aggregate([
    { $match: { _id: userId } },
    {
      $project: {
        _id: 0,
        companies: {
          $filter: {
            input: '$companies',
            as: 'company',
            cond: { $eq: ['$$company.isActive', true] },
          },
        },
      },
    },
  ]);
};
module.exports = getActiveCompanies;
