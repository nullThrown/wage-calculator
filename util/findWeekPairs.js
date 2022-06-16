const findWeekPairs = (date, numOfWeeks) => {
  const monday = new Date(date);
  monday.setUTCHours(0, 0, 0, 0);

  const weeks = [];

  while (monday.getUTCDay() !== 1) {
    monday.setDate(monday.getDate() - 1);
  }
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  sunday.setUTCHours(23, 59, 59, 999);
  weeks.push([monday, sunday]);

  let currentMonday = monday;
  for (let i = 1; i < numOfWeeks; i++) {
    const prevWeekMon = new Date(currentMonday - 1000 * 7 * 24 * 60 * 60);
    const prevWeekSun = new Date(currentMonday - 1);
    currentMonday = prevWeekMon;
    weeks.push([prevWeekMon, prevWeekSun]);
  }
  return weeks.reverse();
};

module.exports = findWeekPairs;
