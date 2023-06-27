const bcrypt = require('bcrypt');
const User = require('../../models/User');
const {
  email_already_exists,
  server_error,
} = require('../../constants/responseTypes');

const updateCurrentUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findById(req.user.id);

    if (user.email !== email) {
      const foundUser = await User.findOne({ email: email });

      if (foundUser) {
        return res.status(409).json(email_already_exists);
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
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = updateCurrentUser;
