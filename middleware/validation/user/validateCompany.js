const Joi = require('joi');
const { mongoIdSchema } = require('../../../services/validation/joiTypes');

const companySchema = Joi.object({
  _id: mongoIdSchema.allow(''),
  name: Joi.string(),
  position: Joi.string(),
  hourlyWage: Joi.number().min(0),
  overtimeMultiplier: Joi.number().min(1),
  isActive: Joi.boolean(),
  isRemoved: Joi.boolean(),
  totalSalesApplicable: Joi.boolean(),
  startDate: Joi.date(),
});
const validateCompany = (req, res, next) => {
  const { error } = companySchema.validate(req.body, { abortEarly: false });
  error ? next(error) : next();
};

module.exports = validateCompany;
