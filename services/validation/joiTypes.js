const Joi = require('joi');
const mongoose = require('mongoose');

const mongoIdValidator = (value, helpers) => {
  const isValidId = mongoose.isObjectIdOrHexString(value);
  if (!isValidId) throw new Error();

  return value;
};

const emailSchema = Joi.string().email({ ignoreLength: true });
const passwordSchema = Joi.string().min(8).max(32);
const mongoIdSchema = Joi.string()
  .custom(mongoIdValidator, 'check if mongoId is valid')
  .message({ 'any.custom': 'Not a valid mongo Id' });
module.exports = { emailSchema, passwordSchema, mongoIdSchema };
