const mongoose = require('mongoose');
const NetworkError = require('../services/error/NetworkError');
const { invalidData } = require('../services/responseTypes/error');

const verifyFilter = (req, res, next) => {
  const filter = req.params.filter;
  const isValidId = mongoose.isObjectIdOrHexString(filter);

  if (filter === 'all' || filter === 'active' || isValidId) return next();
  else {
    return next(
      new NetworkError({
        ...invalidData,
        message: 'filter is not valid search param or company Id',
      })
    );
  }
};

module.exports = verifyFilter;
