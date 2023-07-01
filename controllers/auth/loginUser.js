const bcrypt = require('bcrypt');
const User = require('../../models/User');
const createToken = require('../../services/auth/createToken');

const {
  server_error,
  invalid_credentials,
} = require('../../constants/responseTypes');

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json(invalid_credentials);
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json(invalid_credentials);
    }
    const token = createToken(user._id);

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = loginUser;
