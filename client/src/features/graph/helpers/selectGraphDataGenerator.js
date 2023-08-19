import byDayPerHour from 'features/graph/helpers/byDayPerHour';
import byDayPerShift from 'features/graph/helpers/byDayPerShift';
import byMonthPerHour from './byMonthPerHour';
import byMonthPerShift from './byMonthPerShift';

const selectGraphDataGenerator = (entries, filters) => {
  if (!entries)
    return () => [{ id: 'no-data', data: [{ x: 'no-data', y: 40 }] }];

  const { XAxis, YAxis } = filters;
  if (XAxis === 'byDay') {
    if (YAxis === 'totalPerHour') return byDayPerHour;
    if (YAxis === 'avgTotalPerShift') return byDayPerShift;
  }
  if (XAxis === 'byMonth') {
    if (YAxis === 'totalPerHour') return byMonthPerHour;
    if (YAxis === 'avgTotalPerShift') return byMonthPerShift;
  }
};
export default selectGraphDataGenerator;
