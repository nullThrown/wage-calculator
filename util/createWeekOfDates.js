// creates an array of 7 date objects 24 hours apart
const createWeekOfDates = (date) => {
  const firstDay = new Date(date);
  const weekOfDates = [firstDay];
  for (let i = 0; i < 6; i++) {
    const nextDay = new Date(weekOfDates[i]);
    nextDay.setHours(nextDay.getHours() + 24);
    weekOfDates.push(nextDay);
  }
  return weekOfDates;
};

module.exports = createWeekOfDates;
