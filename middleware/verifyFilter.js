const mongoose = require('mongoose');

const verifyFilter = (req, res, next) => {
  const filter = req.params.filter;
  const isValidId = mongoose.isObjectIdOrHexString(filter);

  if (filter === 'all' || filter === 'active' || isValidId) {
    next();
  } else {
    const error = new Error(
      'filter is not valid search param or mongoose object Id'
    );
    res.status(422).json({ err: error.message });
  }
};

module.exports = verifyFilter;
