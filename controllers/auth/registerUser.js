const bcrypt = require('bcrypt');
const User = require('../../models/User');
const Entries = require('../../models/Entries');
const { emailAlreadyExists } = require('../../services/responseTypes/error');
const createToken = require('../../services/auth/createToken');
const NetworkError = require('../../services/error/NetworkError');

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (user) throw new NetworkError(emailAlreadyExists);
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    user = new User({ username, email, password: hashedPassword });

    const entries = new Entries({ user: user._id });
    await user.save();
    await entries.save();

    const token = createToken(user._id);

    res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = registerUser;
