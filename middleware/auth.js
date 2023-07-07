const jwt = require('jsonwebtoken');
const { invalidToken } = require('../services/responseTypes/error');
const NetworkError = require('../services/error/NetworkError');

const verifyToken = (req, res, next) => {
  const token = req.header('x_auth_token');

  if (!token) return next(new NetworkError(invalidToken));

  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    req.user = decoded.user;
  } catch (err) {
    return next(new NetworkError(invalidToken));
  }
  next();
};
module.exports = verifyToken;
