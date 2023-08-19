const byMonthPerShift = (entries) => {
  const { data } = entries;
  const dataStore = [];

  const companyItem = {
    companyId: '',
    data: [
      { x: 'Jan', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Feb', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Mar', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'April', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'May', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'June', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'July', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Aug', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Sept', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Oct', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Nov', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Dec', numOfShifts: 0, trueTotalEarned: 0 },
    ],
  };

  data.forEach((entry) => {
    const shiftMonth = new Date(entry.shiftDate).getMonth();
    let companyIndex = dataStore.findIndex(
      (item) => item.companyId === entry.company
    );

    if (companyIndex === -1) {
      dataStore.push(JSON.parse(JSON.stringify(companyItem)));
      companyIndex = dataStore.length - 1;
      dataStore[companyIndex].companyId = entry.company;
    }
    dataStore[companyIndex].data[shiftMonth].numOfShifts++;
    dataStore[companyIndex].data[shiftMonth].trueTotalEarned +=
      entry.trueTotalEarned;
  });

  const formattedDataStore = dataStore.map((dataByCompany) => {
    const { data, companyId } = dataByCompany;
    const formattedData = data.map((month) => {
      if (month.numOfShifts === 0) return { x: month.x, y: 0 };
      return { x: month.x, y: month.trueTotalEarned / month.numOfShifts };
    });
    return { id: companyId, data: formattedData };
  });
  return formattedDataStore;
};

export default byMonthPerShift;
