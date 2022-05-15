const calculateData = require('./calculateData');
const data = require('./data');
const companies = ['Love Supreme', 'Punch Bowl Social', 'Maiko'];

const createCompanyData = (companies, entries) => {
  const entriesByCompany = companies.map((company) => {
    return { company: company, entries: [] };
  });

  entries.forEach((entry) => {
    entriesByCompany.forEach((category) => {
      if (category.company === entry.company) {
        category.entries.push(entry);
      }
    });
  });
  const calculatedEntriesByCompany = entriesByCompany.map((category) => {
    const calcData = calculateData(category.entries);
    return { ...category, calcData };
  });

  return calculatedEntriesByCompany;
};

module.exports = createCompanyData;
