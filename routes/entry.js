const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const verifyFilter = require('../middleware/verifyFilter');
const createEntry = require('../controllers/entry/createEntry');
const updateEntry = require('../controllers/entry/updateEntry');
const getOverviewData = require('../controllers/entry/getOverviewData');
const getAllEntries = require('../controllers/entry/getAllEntries');
const getDataByMonth = require('../controllers/entry/getDataByMonth');
const getDataByWeek = require('../controllers/entry/getDataByWeek');
const getShiftData = require('../controllers/entry/getShiftData');
const getSingleEntry = require('../controllers/entry/getSingleEntry');

// ROUTE POST api/entries/create
// DESC create new earning's entry
// ACCESS private
router.post('/create', verifyToken, createEntry);

// ROUTE PUT api/entries/update
// DESC update earning's entry
// ACCESS private
router.put('/update', verifyToken, updateEntry);

// ROUTE GET api/entries/all
// DESC get overview data
// ACCESS private
router.get('/overview/:filter', verifyToken, verifyFilter, getOverviewData);

// ROUTE GET api/entries/:filter
// DESC get all entries
// ACCESS private
router.get('/:filter', verifyToken, verifyFilter, getAllEntries);

// ROUTE GET api/entries/month/:year/:month
// DESC calc data by specific month
// ACCESS private
router.get(
  '/month/:year/:month/:filter',
  verifyToken,
  verifyFilter,
  getDataByMonth
);

// ROUTE GET api/entries/week/:date/:filter
// DESC get entries grouped by weeks (mon-sun both inclusive)
// ACCESS private
router.get('/week/:filter/:date', verifyToken, verifyFilter, getDataByWeek);

// ROUTE GET api/entries/shift
// DESC get filtered shift data
// ACCESS private
router.get('/shift/:filter', verifyToken, verifyFilter, getShiftData);

// ROUTE GET api/entries/:id
// DESC get single entry
// ACCESS private
router.get('/:id', verifyToken, getSingleEntry);

module.exports = router;
