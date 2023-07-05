const Joi = require('joi');
const mongoIdSchema = require('../../../services/validation/joiTypes');

const removedStatusSchema = Joi.object({
  companyId: mongoIdSchema,
  isRemoved: Joi.boolean(),
});

const setCompanyRemovedStatusValidation = (req, res, next) => {
  const { error } = removedStatusSchema.validate(req.body, {
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = setCompanyRemovedStatusValidation;
