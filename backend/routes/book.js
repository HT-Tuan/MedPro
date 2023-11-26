const express = require('express');
const Router = express.Router();

const { getDoctors, getScheduledDoctors, bookTicket } = require('../controllers/bookScheduleController');
const { isAuthenticatedUser } = require('../middlewares/auth');

Router.route('/doctors').get(isAuthenticatedUser, getDoctors);
Router.route('/doctor/scheduled/:id').get(isAuthenticatedUser, getScheduledDoctors);

Router.route('/doctor/book/:doctor/:record/:time').post(isAuthenticatedUser, bookTicket);

module.exports = Router;