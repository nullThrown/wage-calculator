const Joi = require('joi');
const {
  emailSchema,
  passwordSchema,
} = require('../../../services/validation/joiTypes');

const userSchema = Joi.object({
  email: emailSchema,
  username: Joi.string(),
  password: passwordSchema.allow(''),
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body, { abortEarly: false });
  error ? next(error) : next();
};

module.exports = validateUser;
