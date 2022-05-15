const calculateData = require('./calculateData');
const data = require('./data');
const createDayOfWeekData = (entries) => {
  const entriesByDay = [
    {
      day: 'Monday',
      entries: [],
    },
    {
      day: 'Tuesday',
      entries: [],
    },
    {
      day: 'Wednesday',
      entries: [],
    },
    {
      day: 'Thursday',
      entries: [],
    },
    {
      day: 'Friday',
      entries: [],
    },
    {
      day: 'Saturday',
      entries: [],
    },
    {
      day: 'Sunday',
      entries: [],
    },
  ];
  entries.forEach((entry) => {
    const newDate = new Date(entry.shiftDate);
    const shiftDay = newDate.toLocaleDateString('en-US', { weekday: 'long' });

    entriesByDay.forEach((category) => {
      if (category.day === shiftDay) {
        category.entries.push(entry);
      }
    });
  });
  const calculatedEntriesByDay = entriesByDay.map((category) => {
    const calcData = calculateData(category.entries);
    return { ...category, calcData };
  });

  return calculatedEntriesByDay;
};

module.exports = createDayOfWeekData;
