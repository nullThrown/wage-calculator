const createOverviewData = (entries, user) => {
  // Constants 
    // totalTimeWorked
    // totalTips
    // totalSales
    // totalTipOut 
    const data = {
      totalEarnedPerHour: entries.trueTotalTips / entries.totalTimeWorked + user.account.hourlyWage,
      totalTipEarnPerHour: entries.trueTotalTips / entries.totalTimeWorked,
      tipPct: entries.totalTips / entries.totalSales,
      trueTipPct: entries.trueTotalTips / entries.totalSales,
    }
  
  return data;
}

module.exports = createOverviewData;