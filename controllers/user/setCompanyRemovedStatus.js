const User = require('../../models/User');
const { server_error } = require('../../constants/responseTypes');

const setCompanyRemovedStatus = async (req, res) => {
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
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = setCompanyRemovedStatus;
