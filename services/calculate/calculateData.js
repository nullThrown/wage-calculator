const calculateData = (entries) => {
  const data = {
    totalTimeWorked: 0,
    totalEarned: 0,
    trueTotalEarned: 0,
    totalWages: 0,
    creditTips: 0,
    cashTips: 0,
    totalTips: 0,
    trueTotalTips: 0,
    tipsEarnedWithSalesApp: 0,
    tipOutWithSalesApp: 0,
    totalSales: 0,
    totalTipOut: 0,

    totalPerHour: 0,
    tipPerHour: 0,
    tipPct: 0,
    trueTipPct: 0,
  };
  entries.forEach((entry) => {
    data.totalTimeWorked += entry.timeWorkedDec;
    data.totalEarned += entry.totalEarned;
    data.trueTotalEarned += entry.trueTotalEarned;
    data.totalWages += entry.totalWages;
    data.creditTips += entry.creditTips;
    data.cashTips += entry.cashTips;
    data.totalTips += entry.totalTips;
    data.trueTotalTips += entry.trueTotalTips;
    if (entry.totalSalesApplicable) {
      data.tipsEarnedWithSalesApp += entry.totalTips;
      data.tipOutWithSalesApp += entry.tipOut;
    }
    data.totalSales += entry.totalSales;
    data.totalTipOut += entry.tipOut;
  });
  data.totalPerHour = data.trueTotalEarned / data.totalTimeWorked;
  data.tipPerHour = data.trueTotalTips / data.totalTimeWorked;
  data.tipPct = data.tipsEarnedWithSalesApp / data.totalSales;
  data.trueTipPct =
    (data.tipsEarnedWithSalesApp - data.tipOutWithSalesApp) / data.totalSales;

  return data;
};
module.exports = calculateData;
