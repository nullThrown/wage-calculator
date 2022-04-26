const createOverviewData = (entries) => {
  const data = {
    totalHoursWorked: 0,
    totalCredit: 0,
    totalCash: 0,
  };

  entries.forEach((entry) => {
    data.totalHoursWorked += entry.timeWorkedDec;
    data.totalCredit += entry.creditTips;
    data.totalCash += entry.cashTips;
  })
  return data;
}

module.exports = createOverviewData;