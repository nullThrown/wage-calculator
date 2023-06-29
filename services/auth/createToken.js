const jwt = require('jsonwebtoken');

const createToken = (userId) => {
  try {
    const payload = {
      user: {
        id: userId,
      },
    };
    const token = jwt.sign(payload, process.env.JWTSECRET, {
      expiresIn: '20d',
    });
    return token;
  } catch (err) {
    return err;
  }
};

module.exports = createToken;
