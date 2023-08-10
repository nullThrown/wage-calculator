const User = require('../../models/User');
const bcrypt = require('bcrypt');
const {
  invalidCredentials,
  invalidData,
} = require('../../services/responseTypes/error');
const { resourceUpdated } = require('../../services/responseTypes/success');
const NetworkError = require('../../services/error/NetworkError');

const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);
    // decrypt user.password
    // compare decrypted password with currentPassword
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    // if not equal send new error - invalid credentials
    if (!isMatch) throw new NetworkError(invalidCredentials);
    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame)
      throw new NetworkError({
        ...invalidData,
        message: 'Password must be different than the previous one',
      });
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // if equal encrypt newPassword & overwrite password field
    user.password = hashedPassword;
    // save user model
    user.save();
    // send 200 ok response
    res.status(200).json(resourceUpdated);
  } catch (err) {
    next(err);
  }
};

module.exports = updatePassword;
