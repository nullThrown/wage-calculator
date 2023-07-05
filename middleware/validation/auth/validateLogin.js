const Joi = require('joi');
const {
  emailSchema,
  passwordSchema,
} = require('../../../services/validation/joiTypes');

const loginSchema = Joi.object({
  email: emailSchema,
  password: passwordSchema,
});

const validate = (req, res, next) => {
  Joi.assert(req.body, loginSchema, {
    abortEarly: false,
    presence: 'required',
  });
  next();
};
module.exports = validate;
