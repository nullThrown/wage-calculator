const byDayPerHour = (entries) => {
  const { data } = entries;
  const dataStore = [];
  const companyItem = {
    companyId: '',
    companyName: '',
    data: [
      { x: 'Mon', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Tue', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Wed', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Thu', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Fri', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Sat', timeWorkedDec: 0, trueTotalEarned: 0 },
      { x: 'Sun', timeWorkedDec: 0, trueTotalEarned: 0 },
    ],
  };
  data.forEach((entry) => {
    const shiftDay = new Date(entry.shiftDate).getDay();
    let companyIndex = dataStore.findIndex(
      (item) => item.companyId === entry.companyId
    );

    if (companyIndex === -1) {
      dataStore.push(JSON.parse(JSON.stringify(companyItem)));
      companyIndex = dataStore.length - 1;
      dataStore[companyIndex].companyId = entry.companyId;
      dataStore[companyIndex].companyName = entry.companyName;
    }
    dataStore[companyIndex].data[shiftDay].timeWorkedDec += entry.timeWorkedDec;
    dataStore[companyIndex].data[shiftDay].trueTotalEarned +=
      entry.trueTotalEarned;
  });

  const formattedDataStore = dataStore.map((dataByCompany) => {
    const { data, companyName } = dataByCompany;
    const formattedData = data.map((day) => {
      if (day.timeWorkedDec === 0) return { x: day.x, y: 0 };
      return { x: day.x, y: day.trueTotalEarned / day.timeWorkedDec };
    });
    return { id: companyName, data: formattedData };
  });
  return formattedDataStore;
};

export default byDayPerHour;
