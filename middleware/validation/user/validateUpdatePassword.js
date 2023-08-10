const Joi = require('joi');
const { passwordSchema } = require('../../../services/validation/joiTypes');

const updatePasswordSchema = Joi.object({
  currentPassword: passwordSchema,
  newPassword: passwordSchema,
});

const validateUpdatePassword = (req, res, next) => {
  const { error } = updatePasswordSchema.validate(req.body, {
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = validateUpdatePassword;
