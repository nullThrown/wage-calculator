import byDayPerHour from 'features/graph/helpers/byDayPerHour';
import byDayPerShift from 'features/graph/helpers/byDayPerShift';
import byMonthPerHour from './byMonthPerHour';
import byMonthPerShift from './byMonthPerShift';

const selectGraphDataGenerator = (entries, filters) => {
  // if !entries return default/dummy data
  if (!entries)
    return () => [{ id: 'no-data', data: [{ x: 'no-data', y: 40 }] }];

  const { XAxis, shiftTime, YAxis } = filters;
  // if X == 'byDay'
  if (XAxis === 'byDay') {
    // created nest condition
    // if(y == 'totalPerHour' ) return byDayPerHour.js
    if (YAxis === 'totalPerHour') return byDayPerHour;
    // if(y == 'avgTotalPerShift' ) return byDayPerShift.js
    if (YAxis === 'avgTotalPerShift') return byDayPerShift;
  }
  // step out of nested condition
  // if x == 'byMonth'
  if (XAxis === 'byMonth') {
    // if(y == 'totalPerHour' ) return byMonthPerHour.js
    if (YAxis === 'totalPerHour') return byMonthPerHour;
    // if(y == 'avgTotalPerShift' ) return byMonthPerShift.js
    if (YAxis === 'avgTotalPerShift') return byMonthPerShift;
  }
  // // step out of nested condition
  // // if x == 'byYear'
  // if (XAxis === 'byYear') {
  //   // if(y == 'totalPerHour' ) return byYearPerHour.js
  //   if (YAxis === 'totalPerHour') return byYearPerHour;
  //   // if(y == 'avgTotalPerShift' ) return byYearPerShift.js
  //   if (YAxis === 'avgTotalPerShift') return byYearPerShift;
  // }

  // return value of any function
};
export default selectGraphDataGenerator;
