import formatReadableDate from 'util/formatReadableDate';
const filterEntriesByDate = (entries, date) => {
  if (!entries) return [];
  const filterDate = formatReadableDate(date);
  return entries.data.filter((entry) => {
    return formatReadableDate(entry.shiftDate) === filterDate;
  });
};
export default filterEntriesByDate;
