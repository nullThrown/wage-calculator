const calculateData = require('./calculateData');
const data = require('./data');
const position = ['Love Supreme', 'Punch Bowl Social', 'Maiko'];

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

  return calculatedEntriesByCompany;
};

module.exports = createPositonData;
