const jwt = require('jsonwebtoken');
const { token_invalid } = require('../util/responseTypes');

// grabs token from request headers
// may switch to a cookie based system
const verifyToken = (req, res, next) => {
  const token = req.header('x_auth_token');

  if (!token) {
    return res.status(401).json(token_invalid);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
  } catch (err) {
    return res.status(401).json(token_invalid);
  }
  next();
};
module.exports = verifyToken;
