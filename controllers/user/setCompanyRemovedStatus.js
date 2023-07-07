const User = require('../../models/User');

const setCompanyRemovedStatus = async (req, res, next) => {
  const { companyId, isRemoved } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'companies._id': companyId },
      {
        $set: {
          'companies.$.isRemoved': isRemoved,
        },
      },
      {
        returnOriginal: false,
      }
    );
    res.status(200).json(user.companies);
  } catch (err) {
    next(err);
  }
};

module.exports = setCompanyRemovedStatus;
