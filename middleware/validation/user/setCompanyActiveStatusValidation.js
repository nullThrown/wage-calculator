const Joi = require('joi');
const { mongoIdSchema } = require('../../../services/validation/joiTypes');

const activeStatusSchema = Joi.object({
  _id: mongoIdSchema,
  isActive: Joi.boolean(),
});

const setCompanyActiveStatusValidation = (req, res, next) => {
  const { error } = activeStatusSchema.validate(req.body, {
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = setCompanyActiveStatusValidation;
