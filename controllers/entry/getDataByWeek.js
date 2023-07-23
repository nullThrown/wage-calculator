const mongoose = require('mongoose');
const getActiveCompanyIds = require('../../services/queries/user/company');
const findWeekPairs = require('../../util/findWeekPairs');
const calculateData = require('../../business/calculateData');
const {
  getAllActiveEntries,
  getAllEntriesByCompany,
} = require('../../services/queries/entry/overview');

const { getAllWeeklyEntries } = require('../../services/queries/entry/week');
const formatToShortDate = require('../../util/formatToShortDate');
const createWeekOfDates = require('../../util/createWeekOfDates');

const getDataByWeek = async (req, res, next) => {
  let { date, filter } = req.params;
  try {
    const weekPairs = findWeekPairs(date, 26);
    const earliestDate = weekPairs[0][0];
    const latestDate = weekPairs[weekPairs.length - 1][1];
    const userId = mongoose.Types.ObjectId(req.user.id);
    let entries;

    if (filter === 'all') {
      entries = await getAllWeeklyEntries(userId, earliestDate, latestDate);
    } else if (filter === 'active') {
      const activeCompanyIds = await getActiveCompanyIds(userId);

      entries = await getAllActiveEntries(
        userId,
        activeCompanyIds,
        earliestDate,
        latestDate
      );
    } else {
      const companyId = mongoose.Types.ObjectId(filter);
      entries = await getAllEntriesByCompany(
        userId,
        companyId,
        earliestDate,
        latestDate
      );
    }
    // DatesShort property needs to be tested
    let entriesByWeek = weekPairs.map((week) => {
      return {
        startDate: week[0],
        endDate: week[1],
        datesShort: `${formatToShortDate(week[0])} - ${formatToShortDate(
          week[1]
        )}`,
        weekOfDays: createWeekOfDates(week[0]),
        entries: [],
        calcData: {},
      };
    });
    const { data } = entries[0];
    console.log(data[44]);
    data.forEach((entry) => {
      entriesByWeek.forEach((week) => {
        if (
          entry.shiftDate > week.startDate.getTime() &&
          entry.shiftDate < week.endDate.getTime()
        ) {
          week.entries.push(entry);
        }
      });
    });
    // populates calcData fields on entriesByWeek with calcData
    entriesByWeek = entriesByWeek
      .map((week) => {
        const calcData = calculateData(week.entries);

        return { ...week, calcData };
      })
      .reverse();
    res.status(200).json(entriesByWeek);
  } catch (err) {
    next(err);
  }
};

module.exports = getDataByWeek;
