const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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
    
    const message =
    `<!DOCTYPE html>
    <html>
    <head>
        <title>Verification Code</title>
    </head>

    <body>
        <table>
            <tr>
                <table bgcolor="#4184F3" width="100%" border="0" cellspacing="0" cellpadding="0"
                    style="min-width:332px;max-width:600px;border:1px solid #e0e0e0;border-bottom:0;border-top-left-radius:3px;border-top-right-radius:3px">
                    <tr>
                        <td height="72px" colspan="3"></td>
                    </tr>
                    <tr>
                        <td width="32px"></td>
                        <td
                            style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:24px;color:#ffffff;line-height:1.25">
                            Verification Code</td>
                        <td width="32px"></td>
                    </tr>
                    <tr>
                        <td height="18px" colspan="3"></td>
                    </tr>
                </table>
            </tr>

            <tr>
                <td>
                    <table bgcolor="#FAFAFA" width="100%" border="0" cellspacing="0" cellpadding="0"
                        style="min-width:332px;max-width:600px;border:1px solid #f0f0f0;border-bottom:1px solid #c0c0c0;border-top:0;border-bottom-left-radius:3px;border-bottom-right-radius:3px">
                        <tr height="16px">
                            <td width="32px" rowspan="3"></td>
                            <td></td>
                            <td width="32px" rowspan="3"></td>
                        </tr>
                        <tr>
                            <td>
                                <p>Hi <b> ${user.fullname} </b>!</p>
                                <p>The verification code you need to access your Medpro Account (
                                    <span style="color: #659cef;"> ${user.email} </span>
                                    ) is:
                                </p>
                                <div style="text-align: center;">
                                    <strong style="font-size: 24px;font-weight: bold;">${resetVerifycode}</strong>
                                </div>
                                <p>If you don't request this code, someone may be trying to access your Medpro Account (
                                    <span style="color: #659cef;"> ${user.email} </span>
                                    ).
                                    <strong>Please don't forward or give this code to anyone.</strong>
                                </p>
                                <p>Sincerely!</p>
                                <p>Medpro account group</p>
                            </td>
                        </tr>
                        <tr height="32px"></tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>`

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
