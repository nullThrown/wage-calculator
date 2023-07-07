const bcrypt = require('bcrypt');
const User = require('../../models/User');
const createToken = require('../../services/auth/createToken');
const { invalidCredentials } = require('../../services/responseTypes/error');
const NetworkError = require('../../services/error/NetworkError');

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) throw new NetworkError(invalidCredentials);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new NetworkError(invalidCredentials);

    const token = createToken(user._id);

    res.status(200).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = loginUser;
