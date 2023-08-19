const byDayPerShift = (entries) => {
  const { data } = entries;
  const dataStore = [];
  const companyItem = {
    companyId: '',
    data: [
      { x: 'Mon', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Tue', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Wed', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Thu', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Fri', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Sat', numOfShifts: 0, trueTotalEarned: 0 },
      { x: 'Sun', numOfShifts: 0, trueTotalEarned: 0 },
    ],
  };
  data.forEach((entry) => {
    const shiftDay = new Date(entry.shiftDate).getDay();
    let companyIndex = dataStore.findIndex(
      (item) => item.companyId === entry.company
    );

    if (companyIndex === -1) {
      dataStore.push(JSON.parse(JSON.stringify(companyItem)));
      companyIndex = dataStore.length - 1;
      dataStore[companyIndex].companyId = entry.company;
    }
    dataStore[companyIndex].data[shiftDay].numOfShifts++;
    dataStore[companyIndex].data[shiftDay].trueTotalEarned +=
      entry.trueTotalEarned;
  });

  const formattedDataStore = dataStore.map((dataByCompany) => {
    const { data, companyId } = dataByCompany;
    const formattedData = data.map((day) => {
      if (day.numOfShifts === 0) return { x: day.x, y: 0 };
      return { x: day.x, y: day.trueTotalEarned / day.numOfShifts };
    });
    return { id: companyId, data: formattedData };
  });
  return formattedDataStore;
};

export default byDayPerShift;
