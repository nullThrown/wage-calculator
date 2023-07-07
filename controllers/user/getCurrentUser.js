const User = require('../../models/User');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = getCurrentUser;
