const express = require('express');
const router = express.Router();

const { registerUser, loginUser, forgotPassword, resetPassword, updatePassword, logout, getUsers, deleteUser } = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset').put(resetPassword);
router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);
// admin
router.route('/admin/users').get(isAuthenticatedUser, authorizeRoles("admin"), getUsers);
router.route('/admin/user/:id').delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;