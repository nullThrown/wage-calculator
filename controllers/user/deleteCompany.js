const User = require('../../models/User');

const deleteCompany = async (req, res, next) => {
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
    next(err);
  }
};
module.exports = deleteCompany;
