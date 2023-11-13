const express = require('express');
const Router = express.Router();

const { getDoctors, getScheduledDoctors } = require('../controllers/bookscheduleController');
const { isAuthenticatedUser } = require('../middlewares/auth');

Router.route('/doctors').get(isAuthenticatedUser, getDoctors);
Router.route('/doctor/scheduled/:id').get(isAuthenticatedUser, getScheduledDoctors);

module.exports = Router;