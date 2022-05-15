const calculateData = require('./calculateData');

const createPositonData = (positions, entries) => {
  const entriesByPosition = positions.map((position) => {
    return { position: position, entries: [] };
  });

  entries.forEach((entry) => {
    entriesByPosition.forEach((category) => {
      if (category.position === entry.position) {
        category.entries.push(entry);
      }
    });
  });
  const calculatedEntriesByPosition = entriesByPosition.map((category) => {
    const calcData = calculateData(category.entries);
    return { ...category, calcData };
  });

  return calculatedEntriesByPosition;
};

module.exports = createPositonData;
