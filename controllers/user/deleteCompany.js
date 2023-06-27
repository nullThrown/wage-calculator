const User = require('../../models/User');
const { server_error } = require('../../constants/responseTypes');

const deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $pull: {
          companies: { _id: companyId },
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
module.exports = deleteCompany;
