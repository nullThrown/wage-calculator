const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const getCurrentUser = require('../controllers/user/getCurrentUser');
const updateCurrentUser = require('../controllers/user/updateCurrentUser');
const addCompany = require('../controllers/user/addCompany');
const updateCompany = require('../controllers/user/updateCompany');
const deleteCompany = require('../controllers/user/deleteCompany');
const setCompanyRemovedStatus = require('../controllers/user/setCompanyRemovedStatus');

// ROUTE GET api/user/me
// DESC get current user
// ACCESS private
router.get('/me', verifyToken, getCurrentUser);

// ROUTE PUT api/user/me/update
// DESC update current user
// ACCESS private
router.put('/me/update', verifyToken, updateCurrentUser);

// ROUTE POST api/user/company/create
// DESC add company to company list
// ACCESS private
router.post('/company/create', verifyToken, addCompany);

// ROUTE PUT api/user/company/update
// DESC update a company from company list
// ACCESS private
router.put('/company/update', verifyToken, updateCompany);

// ROUTE DELETE api/user/company/delete
// DESC delete company from company list
// ACCESS private
router.delete('/company/delete/:companyId', verifyToken, deleteCompany);

// ROUTE PUT api/user/company/remove/set
// DESC set a companies removed status (soft delete/reinstate)
// ACCESS private
router.put('/company/remove/set', verifyToken, setCompanyRemovedStatus);

module.exports = router;
