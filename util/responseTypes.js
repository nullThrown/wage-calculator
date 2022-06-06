// error
const token_invalid = { msg: 'token_invalid' };
const resource_not_found = { msg: 'resource_not_found' };
const invalid_data = { msg: 'invalid_data' };
const invalid_credentials = { msg: 'invalid_credentials' };
const email_already_exists = { msg: 'email_already_exists' };
const server_error = { msg: 'server_error' };

// success
const token_valid = { msg: 'token_valid' };
const password_match = { msg: 'password_match' };
const resource_deleted = { msg: 'resource_deleted' };
const resource_created = { msg: 'resource_created' };
const resource_updated = { msg: 'resource_updated' };

module.exports = {
  token_invalid,
  resource_not_found,
  invalid_data,
  invalid_credentials,
  email_already_exists,
  server_error,
  token_valid,
  password_match,
  resource_deleted,
  resource_created,
  resource_updated,
};
