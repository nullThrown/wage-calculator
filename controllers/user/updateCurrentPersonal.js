const User = require('../../models/User');
const { emailAlreadyExists } = require('../../services/responseTypes/error');
const NetworkError = require('../../services/error/NetworkError');

const updateCurrentPersonal = async (req, res, next) => {
  try {
    const { username, email } = req.body;
    const user = await User.findById(req.user.id);
    if (user.email !== email) {
      const foundUser = await User.findOne({ email: email });

      if (foundUser) throw new NetworkError(emailAlreadyExists);
    }

    user.username = username;
    user.email = email;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = updateCurrentPersonal;
