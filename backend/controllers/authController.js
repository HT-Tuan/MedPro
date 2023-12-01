const User = require('../models/user');
const Record = require('../models/record');
const Ticket = require('../models/ticket');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const path = require('path');
const pug = require('pug');

// Register a user => /api/medpro/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { fullname, email, password, gender, birthday } = req.body;
    const user = await User.create({
        fullname,
        email,
        password,
        gender,
        birthday
    });
    sendToken(user, 200, res);
})

// Login User => /api/medpro/login
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;
    // Check if email and password is entered by user
    if (!email || !password) {
        return next(new ErrorHandler('Please enter email & password', 400));
    }
    // Finding user in database
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    // Check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler('Invalid Email or Password', 401));
    }
    sendToken(user, 200, res);
})

// Forgot Password => /api/medpro/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler('User not found with this email', 404));
    }

    // Get reset verifycode
    const resetVerifycode = user.getVerifyCode();

    await user.save({ validateBeforeSave: false });
    const templatePath = path.join(__dirname, '../templates/VerifyCode.pug');
    const compiledFunction = pug.compileFile(templatePath);
    const message = compiledFunction({ user, resetVerifycode });

    try {
        await sendEmail({
            email: user.email,
            subject: 'Medpro Password Recovery',
            message
        })
        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`
        })
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset Password => /api/medpro/password/reset
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // Hash URL token
    const resetVerifycode = crypto.createHash('sha256').update(req.body.verifycode).digest('hex');
    const user = await User.findOne({
        'verifycode.code': resetVerifycode,
        'verifycode.expiresAt': { $gt: Date.now() }
    })
    if (!user) {
        return next(new ErrorHandler('Verifycode is invalid or has been expired', 400))
    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Password does not match', 400))
    }
    // Setup new password
    user.password = req.body.password;
    user.verifycode = undefined;
    await user.save();
    sendToken(user, 200, res);
})
//Update password => /api/medpro/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');
    // Check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new ErrorHandler('Old password is incorrect', 400));
    }
    user.password = req.body.password;
    await user.save();
    sendToken(user, 200, res);
})

// Logout user => /api/medpro/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).json({
        success: true,
        message: 'Logged out'
    })
})

// admin
// Get all users => /api/medpro/admin/users
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 8;
    const usersCount = await User.countDocuments({ role: "user" });
    const apiFeatures1 = new APIFeatures(User.find({ role: "user" }), req.query)
        .search()
    const users1 = await apiFeatures1.query;
    const filteredUsersCount = users1.length;
    const apiFeatures2 = new APIFeatures(User.find({ role: "user" }), req.query)
        .search()
        .pagination(resPerPage);
    const users = await apiFeatures2.query;
    const usertemp = await User.find({ role: "user" });
    let totalAmount = 0;
    usertemp.forEach(user => {
        totalAmount += user.record.length;
    })
    res.status(200).json({
        success: true,
        usersCount,
        resPerPage,
        filteredUsersCount,
        totalAmount,
        users
    })
})

// Delete user => /api/medpro/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler('User not found', 404));
    }
    await Record.deleteMany({_id: {$in: user.record}});
    await Ticket.deleteMany({_id: {$in: user.ticket}});
    await User.deleteOne({ _id: req.params.id })
    res.status(200).json({
        success: true,
        message: 'User is deleted'
    })
})