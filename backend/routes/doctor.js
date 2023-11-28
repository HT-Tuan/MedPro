const express = require('express');
const router = express.Router();

const { getDoctors, getScheduledDoctors, newDoctor, getDoctor, updateDoctor, deleteDoctor } = require('../controllers/doctorController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

router.route('/doctors').get(isAuthenticatedUser, getDoctors);
router.route('/doctor/scheduled/:id').get(isAuthenticatedUser, getScheduledDoctors);

// admin
router.route('/admin/doctor/new').post(isAuthenticatedUser, authorizeRoles("admin"), newDoctor);
router.route('/admin/doctor/:id')
  .get(isAuthenticatedUser, authorizeRoles("admin"), getDoctor)
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateDoctor)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteDoctor);

module.exports = router;