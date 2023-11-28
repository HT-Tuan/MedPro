const express = require('express');
const router = express.Router();

const { bookTicket, getTickets, updateTicket, deleteTicket } = require('../controllers/ticketController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/ticket/book/:doctor/:record/:time').post(isAuthenticatedUser, bookTicket);
// admin
router.route('/admin/tickets').get(isAuthenticatedUser, authorizeRoles("admin"), getTickets);
router.route('/admin/ticket/:id')
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateTicket)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteTicket);

module.exports = router;