const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const verifyFilter = require('../middleware/verifyFilter');
const createEntry = require('../controllers/entry/createEntry');
const updateEntry = require('../controllers/entry/updateEntry');
const getOverviewData = require('../controllers/entry/getOverviewData');
const getAllEntries = require('../controllers/entry/getAllEntries');
const getDataByMonth = require('../controllers/entry/getDataByMonth');
const getShiftData = require('../controllers/entry/getShiftData');
const validateNewEntry = require('../middleware/validation/entry/validateNewEntry');
const validateUpdateEntry = require('../middleware/validation/entry/validateUpdateEntry');
const testPopulate = require('../controllers/entry/getSingleEntry');

// MIDDLEWARE
// ROUTE ALL api/entries/*
// DESC verify user token
router.use(verifyToken);

// ROUTE POST api/entries/create
// DESC create new earning's entry
// ACCESS private
router.post('/create', validateNewEntry, createEntry);

// ROUTE PUT api/entries/update
// DESC update earning's entry
// ACCESS private
router.put('/update', validateUpdateEntry, updateEntry);

// ROUTE GET api/entries/all
// DESC get overview data
// ACCESS private
router.get('/overview/:filter', verifyFilter, getOverviewData);

// ROUTE GET api/entries/:filter
// DESC get all entries
// ACCESS private
router.get('/:filter', verifyFilter, getAllEntries);

// ROUTE GET api/entries/month/:year/:month
// DESC calc data by specific month
// ACCESS private
router.get('/month/:year/:month/:filter', verifyFilter, getDataByMonth);

// ROUTE GET api/entries/shift
// DESC get filtered shift data
// ACCESS private
router.get('/shift/:filter', verifyFilter, getShiftData);

// ROUTE GET api/entries/:id
// DESC get single entry
// ACCESS private
// router.get('/:id', getSingleEntry);

// ROUTE GET api/entries/test/populate
// DESC get single entry
// ACCESS private
router.get('/test/populate', testPopulate);

module.exports = router;
