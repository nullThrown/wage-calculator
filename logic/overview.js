// user object can be removed
// hourlyWage property is being stored on each entry

const createOverviewData = (entries, user) => {
  const { trueTotalTips, totalTimeWorked, totalSales, totalTips } = entries;
  const data = {
    totalEarnedPerHour:
      trueTotalTips / totalTimeWorked + user.account.hourlyWage,
    tipEarnedPerHour: trueTotalTips / totalTimeWorked,
    tipPct: totalTips / totalSales,
    trueTipPct: trueTotalTips / totalSales,
  };

  return data;
};

module.exports = createOverviewData;
