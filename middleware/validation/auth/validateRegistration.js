const Joi = require('joi');
const {
  emailSchema,
  passwordSchema,
} = require('../../../services/validation/joiTypes');

const registerSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
  username: Joi.string(),
});

const validateRegistration = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, {
    presence: 'required',
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = validateRegistration;
