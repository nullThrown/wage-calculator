const invalidToken = {
  message: 'Invalid Credentials',
  type: 'invalid_token',
  statusCode: 401,
};
const resourceNotFound = {
  message: 'Resource not found',
  type: 'resource_not_found',
  statusCode: 404,
};
const invalidData = {
  message: 'Data is not valid',
  type: 'invalid_data',
  statusCode: 400,
};
const invalidCredentials = {
  message: 'Invalid Credentials',
  type: 'invalid_credentials',
  statusCode: 400,
};
const emailAlreadyExists = {
  message: 'Email has already been registered',
  type: 'email_already_exists',
  statusCode: 409,
};
const serverError = {
  message: 'Server error',
  type: 'server_error',
  statusCode: 500,
};

module.exports = {
  invalidToken,
  resourceNotFound,
  invalidData,
  invalidCredentials,
  emailAlreadyExists,
  serverError,
};
