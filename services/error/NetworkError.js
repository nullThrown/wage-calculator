class NetworkError extends Error {
  constructor(responseObj) {
    super(responseObj.message);
    this.name = 'NetworkError';
    this.type = responseObj.type;
    this.statusCode = responseObj.statusCode;
    this.errors = responseObj.errors;
  }
}

module.exports = NetworkError;
