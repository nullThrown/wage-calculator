const User = require('../../models/User');

const setCompanyActiveStatus = async (req, res, next) => {
  const { _id, isActive } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'companies._id': _id },
      {
        $set: {
          'companies.$.isActive': isActive,
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

module.exports = setCompanyActiveStatus;
