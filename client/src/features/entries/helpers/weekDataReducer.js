const weekDataReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'init_data':
      const weekDates = payload.map((week) => week.datesShort);

      return {
        ...state,
        weekDates: weekDates,
        currentWeek: weekDates[0],
        selectedWeekData: payload[0],
      };

    case 'switch_week':
      const selectedWeekData = payload.data.find(
        (week) => week.datesShort === payload.selectedWeek
      );
      return {
        ...state,
        selectedWeekData,
      };

    default:
      throw new Error('no action');
  }
};

export default weekDataReducer;
