const createWeekOfDates = require('../createWeekOfDates/createWeekOfDates');

const filterEntriesByWeek = (date, entries) => {
  const weekOfDates = createWeekOfDates(date);
  if (!entries) return weekOfDates;
  const filteredEntries = weekOfDates.map((day) => {
    entries.data.forEach((entry) => {
      const newDate = new Date(entry.shiftDate);
      if (
        (day.date.getFullYear() === newDate.getFullYear()) &
        (day.date.getMonth() === newDate.getMonth()) &
        (day.date.getDate() === newDate.getDate())
      ) {
        day.entries.push(entry);
      }
    });
    return day;
  });
  return filteredEntries;
};

export default filterEntriesByWeek;
