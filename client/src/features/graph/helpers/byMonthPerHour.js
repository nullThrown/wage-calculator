const byMonthPerHour = (entries) => {
  const { data } = entries;
  const dataStore = [];

  const companyItem = {
    companyId: '',
    data: [
      { x: 'Jan', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Feb', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Mar', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'April', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'May', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'June', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'July', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Aug', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Sept', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Oct', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Nov', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Dec', timeWorkedDec: 0, trueTotalEarned: 0 },
    ],
  };

  data.forEach((entry) => {
    const shiftMonth = new Date(entry.shiftDate).getMonth();
    console.log(shiftMonth);
    let companyIndex = dataStore.findIndex(
      (item) => item.companyId === entry.company
    );

    if (companyIndex === -1) {
      dataStore.push(JSON.parse(JSON.stringify(companyItem)));
      companyIndex = dataStore.length - 1;
      dataStore[companyIndex].companyId = entry.company;
    }
    dataStore[companyIndex].data[shiftMonth].timeWorkedDec +=
      entry.timeWorkedDec;
    dataStore[companyIndex].data[shiftMonth].trueTotalEarned +=
      entry.trueTotalEarned;
  });

  const formattedDataStore = dataStore.map((dataByCompany) => {
    const { data, companyId } = dataByCompany;
    const formattedData = data.map((month) => {
      if (month.timeWorkedDec === 0) return { x: month.x, y: 0 };
      return { x: month.x, y: month.trueTotalEarned / month.timeWorkedDec };
    });
    return { id: companyId, data: formattedData };
  });
  return formattedDataStore;
};

export default byMonthPerHour;
