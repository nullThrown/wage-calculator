const selectWeekData = (date, data) => {
  if (!data) return {};
  const selectedTimestamp = date.setHours(0, 0, 0, 0);
  const selectWeekData = data.find((week) => {
    const { startDate, endDate } = week;
    const startTimestamp = new Date(startDate.replace('Z', '')).getTime();
    const endTimestamp = new Date(endDate.replace('Z', '')).getTime();

    if (
      (selectedTimestamp >= startTimestamp) &
      (selectedTimestamp <= endTimestamp)
    ) {
      return week;
    } else {
      return;
    }
  });
  return selectWeekData ? selectWeekData : {};
};

export default selectWeekData;
