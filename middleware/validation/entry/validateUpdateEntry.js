const Joi = require('joi');
const { mongoIdSchema } = require('../../../services/validation/joiTypes');

const updateEntrySchema = Joi.object({
  _id: mongoIdSchema,
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

const validateUpdateEntry = (req, res, next) => {
  const {
    _id,
    minutesWorked,
    hoursWorked,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipOut,
    shiftTime,
    companyId,
    specialEvent,
    shiftDate,
  } = req.body;

  const fieldsToBeValidated = {
    _id,
    minutesWorked,
    hoursWorked,
    totalSales,
    totalSalesApplicable,
    creditTips,
    cashTips,
    tipOut,
    shiftTime,
    companyId,
    specialEvent,
    shiftDate,
  };

  const { error } = updateEntrySchema.validate(fieldsToBeValidated, {
    presence: 'required',
    abortEarly: false,
  });
  error ? next(error) : next();
};

module.exports = validateUpdateEntry;
