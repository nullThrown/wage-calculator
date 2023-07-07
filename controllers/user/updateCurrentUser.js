const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { emailAlreadyExists } = require('../../services/responseTypes/error');
const NetworkError = require('../../services/error/NetworkError');

const updateCurrentUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.email !== email) {
      const foundUser = await User.findOne({ email: email });

      if (foundUser) {
        throw new NetworkError(emailAlreadyExists);
      }
    }
    if (password) {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }

    user.username = username;
    user.email = email;

    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

module.exports = updateCurrentUser;
