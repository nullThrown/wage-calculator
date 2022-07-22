// returns a String as the following format
//  month (short) day (1-31)
// e.g., jun 3, oct 31
const formatToShortDate = (date) => {
  return new Date(date).toLocaleString('en-us', {
    timeZone: 'UTC',
    month: 'short',
    day: 'numeric',
  });
};

module.exports = formatToShortDate;
