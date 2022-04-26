class Analytics {
  entries = [];
  totalHours = 0;
  constructor(entries) {
    this.entries = entries;
    this.totalHours = this.totalHours =  this.entries.reduce((acc, value) => {
      return acc + value.timeWorkedDec;
    }, 0);
  }
  
}


module.exports = Analytics;
