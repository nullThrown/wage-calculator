const calculateData = require('./calculateData');
const data = require('./data');

const createShiftTimeData = (shiftTime, entries) => {
  const entriesByShiftTime = shiftTime.map((shiftTime) => {
    // do I need to declare both prop name and value for shiftTime?
    return { shiftTime: shiftTime, entries: [] };
  });

  entries.forEach((entry) => {
    entriesByShiftTime.forEach((category) => {
      if (category.shiftTime === entry.shiftTime) {
        category.entries.push(entry);
      }
    });
  });
  const calculatedEntriesByShiftTime = entriesByShiftTime.map((category) => {
    const calcData = calculateData(category.entries);
    return { ...category, calcData };
  });

  return calculatedEntriesByShiftTime;
};

module.exports = createShiftTimeData;
