const Entries = require('../../models/Entries');
const { server_error } = require('../../constants/responseTypes');

const getShiftData = async (req, res) => {
  // make query to get all entries
  // create object to hold data for different filters
  // forEach entries array
  // calculate avg/hr for each filter
  // return calc data object
  try {
    // const entries = await Entries.findOne({ user: req.user.id });

    // const byDayData = [
    //   {
    //     day: 'Sunday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Monday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Tuesday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Wednesday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Thursday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Friday',
    //     avgPerHour: 0,
    //   },
    //   {
    //     day: 'Saturday',
    //     avgPerHour: 0,
    //   },
    // ];

    // // entry.shiftDate.toLocaleString('en-us', { weekday: 'long' })
    // entries.data.forEach((entry) => {
    //   // if shiftDay
    // });
    // res.json(entries);
    res.status(200).json({ msg: 'shift route works' });
  } catch (err) {
    console.log(err);
    res.status(500).json(server_error);
  }
};

module.exports = getShiftData;
