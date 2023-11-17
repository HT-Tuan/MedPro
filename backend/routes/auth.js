const express = require('express');
const router = express.Router();

const { registerUser, loginUser, forgotPassword, resetPassword, updatePassword, logout } = require('../controllers/authController');
const { isAuthenticatedUser } = require('../middlewares/auth');


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset').put(resetPassword);
router.route('/logout').get(logout);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

module.exports = router;