const User = require('../models/User');
const { invalid_credentials } = require('../util/responseTypes');

const verifyUser = async (req, res, next) => {
  let { username } = req.body;
  if (!username) {
    username = req.params.username;
  }
  try {
    if (!username) throw 'invalid_credentials';
    const user = await User.findOne({ username: username });
    if (!user) throw 'invalid_credentials';
  } catch (err) {
    if (err === 'invalid_credentials') {
      return res.status(401).json(invalid_credentials);
    }

    return res.status(500).json({ error: 'server_error' });
  }
  next();
};

module.exports = verifyUser;
