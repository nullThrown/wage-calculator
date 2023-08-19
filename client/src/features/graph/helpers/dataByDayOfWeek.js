const companyItem = {
  companyId: '',
  data: [
    { day: 0, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 1, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 2, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 3, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 4, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 5, timeWorkedDec: 0, trueTotalEarned: 0 },
    { day: 6, timeWorkedDec: 0, trueTotalEarned: 0 },
  ],
};

const calcByDayOfWeek = (entries) => {
  const dataStore = [];
  entries.forEach((entry) => {
    const shiftDay = new Date(entry.shiftDate).getDay();
    let companyIndex = dataStore.findIndex(
      (item) => item.companyId === entry.company
    );

    if (companyIndex === -1) {
      dataStore.push(JSON.parse(JSON.stringify(companyItem)));
      companyIndex = dataStore.length - 1;
      dataStore[dataStore.length - 1].companyId = entry.company;
    }
    dataStore[companyIndex].data[shiftDay].timeWorkedDec += entry.timeWorkedDec;
    dataStore[companyIndex].data[shiftDay].trueTotalEarned +=
      entry.trueTotalEarned;
  });
  console.log(dataStore);
};
