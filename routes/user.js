const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const getCurrentUser = require('../controllers/user/getCurrentUser');
const updateCurrentUser = require('../controllers/user/updateCurrentUser');
const createCompany = require('../controllers/user/createCompany');
const updateCompany = require('../controllers/user/updateCompany');
const deleteCompany = require('../controllers/user/deleteCompany');
const setCompanyRemovedStatus = require('../controllers/user/setCompanyRemovedStatus');
const validateUser = require('../middleware/validation/user/validateUser');
const validateCompany = require('../middleware/validation/user/validateCompany');
const validateCompanyDelete = require('../middleware/validation/user/validateCompanyDelete');
const setCompanyRemovedStatusValidation = require('../middleware/validation/user/setCompanyRemovedStatusValidation');

// ROUTE MIDDLEWARE api/user
// DESC verify user
router.use(verifyToken);

// ROUTE GET api/user/me
// DESC get current user
// ACCESS private
router.get('/me', getCurrentUser);

// ROUTE PUT api/user/me/update
// DESC update current user
// ACCESS private
router.put('/me/update', validateUser, updateCurrentUser);

// ROUTE POST api/user/company/create
// DESC add company to company list
// ACCESS private
router.post('/company/create', validateCompany, createCompany);

// ROUTE PUT api/user/company/update
// DESC update a company from company list
// ACCESS private
router.put('/company/update', validateCompany, updateCompany);

// ROUTE DELETE api/user/company/delete
// DESC delete company from company list
// ACCESS private
router.delete(
  '/company/delete/:companyId',
  validateCompanyDelete,
  deleteCompany
);

// ROUTE PUT api/user/company/remove/set
// DESC set a companies removed status (soft delete/reinstate)
// ACCESS private
router.put(
  '/company/remove/set',
  setCompanyRemovedStatusValidation,
  setCompanyRemovedStatus
);

module.exports = router;
