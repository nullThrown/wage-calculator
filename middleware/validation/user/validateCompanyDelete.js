const Joi = require('joi');
const { mongoIdSchema } = require('../../../services/validation/joiTypes');

const companyIdSchema = Joi.object({
  companyId: mongoIdSchema,
});

const validateCompanyDelete = (req, res, next) => {
  const { error } = companyIdSchema.validate(req.params, {
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = validateCompanyDelete;
