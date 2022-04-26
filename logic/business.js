class Analytics {
  constructor(entries) {
    this.entries = entries;
  }

  calcTotalHoursWorked() {
    this.entries.reduce((acc, value) => {
      return acc + value.timeWorkedDec;
    }, 0);
  }
  calcTotalTips() {
    const totalTips = {
      totalCash: 0,
      totalCredit: 0,
      totalTips: 0,
    };
    this.entries.forEach((entry) => {
      totalTips.totalCash += entry.cashTips;
      totalTips.totalCredit += entry.creditTips;
    });
    totalTips.totalTips = entry.cashTips + entry.creditTips;
    return totalTips;
  }
  calcTotalTipOut() {
    this.entries.reduce((acc, value) => {
      return acc + value.tipOut;
    }, 0);
  }
}

export default Analytics;
