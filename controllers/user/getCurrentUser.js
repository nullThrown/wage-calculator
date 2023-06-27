const User = require('../../models/User');
const { server_error } = require('../../constants/responseTypes');

const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = getCurrentUser;
