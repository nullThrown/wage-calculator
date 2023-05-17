const jwt = require('jsonwebtoken');

const createJwtToken = (user) => {
  const payload = {
    user: {
      id: user.id,
    },
  };
  const token = jwt.sign(
    payload,
    process.env.JWTSECRET,
    { expiresIn: '20d' },
    (err, token) => {
      return err ? { success: false } : { success: true, token };
    }
  );
  return token;
};

module.exports = createJwtToken;
