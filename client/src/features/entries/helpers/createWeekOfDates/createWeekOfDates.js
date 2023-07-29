const createWeekOfDates = (date) => {
  // prevents the original date object from being mutated
  const newDate = new Date(date);
  try {
    while (newDate.getDay() !== 1) {
      newDate.setDate(newDate.getDate() - 1);
    }
    let entriesByDate = [];
    for (let i = 0; i < 7; i++) {
      if (i === 0) {
        entriesByDate.push({ date: new Date(newDate), entries: [] });
      } else {
        const nextDayTimestamp = newDate.setDate(newDate.getDate() + 1);
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
