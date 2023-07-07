const NetworkError = require('../services/error/NetworkError');
const { serverError, invalidData } = require('../services/responseTypes/error');

const handleError = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    const networkError = new NetworkError(invalidData);
    networkError.errors = error.details;
    res.status(400).json(networkError);
  } else if (error.name === 'NetworkError') {
    res.status(error.statusCode).json(error);
  } else {
    const networkError = new NetworkError(serverError);
    res.status(networkError.statusCode).json(networkError);
  }
};

module.exports = handleError;
