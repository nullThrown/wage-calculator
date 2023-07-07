const User = require('../../models/User');

const createCompany = async (req, res, next) => {
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
    next(err);
  }
};

module.exports = createCompany;
