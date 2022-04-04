const mongoose = require('mongoose');

module.exports = mongooseConnect = async () => {
  try {
    await mongoose.connect(
      process.env.MONGOURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log('mongoose connection secured')
    );
  } catch (err) {
    console.log(err);
  }
};
