const User = require('../../models/User');
const { server_error } = require('../../constants/responseTypes');

const updateCompany = async (req, res) => {
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
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = updateCompany;
