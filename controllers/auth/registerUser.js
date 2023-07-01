const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Entries = require('../../models/Entries');
const {
  email_already_exists,
  server_error,
} = require('../../constants/responseTypes');
const createToken = require('../../services/auth/createToken');

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) {
      res.status(422).json(email_already_exists);
    } else {
      const salt = await bcrypt.genSalt(12);
      const hashedPassword = await bcrypt.hash(password, salt);
      user = new User({ username, email, password: hashedPassword });

      const entries = new Entries({ user: user._id });
      await user.save();
      await entries.save();

      const token = createToken(user._id);

      res.status(201).json({ token });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = registerUser;
