const express = require('express');
const router = express.Router();

const { newRecord, getRecords, getTickets, updateRecord, deleteRecord, getAdminRecords } = require('../controllers/userController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/record/new').post(isAuthenticatedUser, newRecord);
router.route('/records').get(isAuthenticatedUser, getRecords);
router.route('/tickets').get(isAuthenticatedUser, getTickets);
router.route('/record/:id')
    .put(isAuthenticatedUser, updateRecord)
    .delete(isAuthenticatedUser, deleteRecord);
// admin
router.route('/admin/records').get(isAuthenticatedUser, authorizeRoles("admin"), getAdminRecords);


module.exports = router;