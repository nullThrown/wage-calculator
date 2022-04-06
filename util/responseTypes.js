// error
const unauthenticated = { error: 'unauthenticated' };
const resource_not_found = { error: 'resource_not_found' };
const invalid_data = { error: 'invalid_data' };
const invalid_credentials = { error: 'invalid_credentials' };
const email_already_exists = { error: 'email_already_exists' };
const server_error = { error: 'server_error' };
// success
const resource_deleted = { success: 'resource_deleted' };
// const resource_created = 'resource_created';
// const resource_edited = 'resource_edited';

module.exports = {
  unauthenticated,
  resource_not_found,
  invalid_data,
  invalid_credentials,
  email_already_exists,
  server_error,
  resource_deleted,
};
