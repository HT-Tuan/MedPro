const express = require('express');
const router = express.Router();

const { newRecord, getRecords, getTickets, updateRecord, deleteRecord } = require('../controllers/userController');
const { isAuthenticatedUser } = require('../middlewares/auth');
const { get } = require('mongoose');

router.route('/record/new').post(isAuthenticatedUser, newRecord);
router.route('/records').get(isAuthenticatedUser, getRecords);
router.route('/tickets').get(isAuthenticatedUser, getTickets);
router.route('/record/:id')
    .put(isAuthenticatedUser, updateRecord)
    .delete(isAuthenticatedUser, deleteRecord);


module.exports = router;