const User = require('../../models/User');

const updateCompany = async (req, res, next) => {
  const {
    companyId,
    name,
    position,
    hourlyWage,
    overtimeMultiplier,
    totalSalesApplicable,
    isActive,
  } = req.body;
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user.id, 'companies._id': companyId },
      {
        $set: {
          'companies.$.name': name,
          'companies.$.position': position,
          'companies.$.hourlyWage': hourlyWage,
          'companies.$.overtimeMultiplier': overtimeMultiplier,
          'companies.$.totalSalesApplicable': totalSalesApplicable,
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

module.exports = updateCompany;
