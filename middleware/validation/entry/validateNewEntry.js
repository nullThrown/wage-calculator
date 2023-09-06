const Joi = require('joi');
const { mongoIdSchema } = require('../../../services/validation/joiTypes');

const entrySchema = Joi.object({
  minutesWorked: Joi.number().integer().min(0).max(59),
  hoursWorked: Joi.number().integer().min(0).max(23),
  totalSales: Joi.number().min(0),
  totalSalesApplicable: Joi.boolean().default(true),
  creditTips: Joi.number().min(0),
  cashTips: Joi.number().min(0),
  tipOut: Joi.number().min(0),
  shiftTime: Joi.string().valid('morning', 'night'),
  companyId: mongoIdSchema,
  specialEvent: Joi.boolean().default(false),
  shiftDate: Joi.date(),
});

const validateNewEntry = (req, res, next) => {
  const { error } = entrySchema.validate(req.body, {
    presence: 'required',
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = validateNewEntry;
