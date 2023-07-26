const createWeekOfDates = (date) => {
  try {
    while (date.getDay() !== 1) {
      date.setDate(date.getDate() - 1);
    }
    let entriesByDate = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        const newDate = new Date(date);
        entriesByDate.push({ date: newDate, entries: [] });
      } else {
        const nextDayTimestamp = date.setDate(date.getDate() + 1);
        const nextDay = new Date(nextDayTimestamp);
        entriesByDate.push({ date: nextDay, entries: [] });
      }
    }
    return entriesByDate;
  } catch (err) {
    console.log(err);
  }
};

module.exports = createWeekOfDates;
