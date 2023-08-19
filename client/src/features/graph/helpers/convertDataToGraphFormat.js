// converts data from entries consolidated by day of week
// into format that can be consumed by @nivo/line
const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const convertToGraphData = (dataByDayOfWeek) => {
  dataByDayOfWeek.forEach((dataByCompany) => {
    let { data } = dataByCompany;
    data = data.map((data) => {
      return {
        x: week[data.day],
        y: data.trueTotalEarned / data.timeWorkedDec,
      };
    });
  });
};
