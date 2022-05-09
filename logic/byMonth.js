const createByMonthData = (entries) => {
  // these vars are use to keep track of amounts that determine tip percentage
  // if totalSales (amount sold during shift) is not presented to the employee
  // then a tip percentage cannot be calculated
  let tipsEarnedWithSalesApp = 0;
  let totalSalesWithSalesApp = 0;
  let hoursWorkedWithSalesApp = 0;

  const data = {
    hoursWorked: 0,
    totalEarned: 0,
    trueTotalEarned: 0,
    wagesEarned: 0,
    tipsEarned: 0,
    creditTips: 0,
    CashTips: 0,
    tipOut: 0,
    totalEarnedPerHour: 0,
    tipEarnedPerHour: 0,

    tipPct: 0,
    trueTipPct: 0,
  };
  entries.forEach((entry) => {
    if (entry.totalSalesApplicable) {
      totalSalesWithSalesApp += entry.totalSales;
      tipsEarnedWithSalesApp += entry.totalTips;
      hoursWorkedWithSalesApp += entry.timeWorkedDec;
    }
    data.hoursWorked += entry.timeWorkedDec;
    data.totalEarned += entry.totalEarned;
    data.trueTotalEarned += entry.trueTotalEarned;
    data.wagesEarned += entry.totalWagesEarned;
    data.tipsEarned += entry.totalTips;
    data.creditTips += entry.creditTips;
    data.CashTips += entry.cashTips;
    data.tipOut += entry.tipOut;
  });
  data.totalEarnedPerHour = data.totalEarned / data.hoursWorked;
  data.tipEarnedPerHour = data.tipsEarned / data.hoursWorked;
  data.tipPct = tipsEarnedWithSalesApp / totalSalesWithSalesApp;
  data.trueTipPct =
    (tipsEarnedWithSalesApp - data.tipOut) / totalSalesWithSalesApp;
  return data;
};

module.exports = createByMonthData;

// bestShift: {
//   hoursWorked: 0,
//   location: '',
//   position: '',
//   shiftTime: '',
//   specialEvent: false,
//   avgEarnedPerHour: 0,
//   totalEarned: 0,
//   TipsEarned: 0,
//   wagesEarned: 0,
// },
