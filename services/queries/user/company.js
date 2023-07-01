const User = require('../../../models/User');
const mongoose = require('mongoose');

const getActiveCompanyIds = async (userId) => {
  const user = await User.aggregate([
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
  return user[0].companies.map((company) => {
    return mongoose.Types.ObjectId(company._id);
  });
};
module.exports = getActiveCompanyIds;
