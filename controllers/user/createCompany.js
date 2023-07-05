const User = require('../../models/User');
const { server_error } = require('../../constants/responseTypes');

const createCompany = async (req, res) => {
  const {
    name,
    position,
    hourlyWage,
    overtimeMultiplier,
    totalSalesApplicable,
  } = req.body;

  try {
    const newCompany = {
      name,
      position,
      hourlyWage,
      overtimeMultiplier,
      totalSalesApplicable,
    };
    const user = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        $push: { companies: newCompany },
      },
      { returnOriginal: false }
    );
    res.status(201).json(user.companies);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = createCompany;
