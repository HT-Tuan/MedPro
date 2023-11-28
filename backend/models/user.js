const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your fullname'],
        maxLength: [30, 'Your fullname cannot exceed 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter your password'],
        minlength: [6, 'Your password must be longer than 6 characters'],
        select: false
    },
    role: {
        type: String,
        default: 'user'
    },
    gender: {
        type: String,
        required: [true, 'Please select gender for this doctor'],
        enum: {
            values: ['Nam', 'Nữ', 'Khác'],
            message: 'Please select correct title for doctor'
        }
    },
    birthday: {
        type: Date,
        require: [true, 'Please enter your birthday']
    },
    record: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Record'
    }],
    ticket: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Ticket'
    }],
    verifycode: {
        code : {
            type: String,
            maxLength: [6, 'Your veryfycode must have exactly 6 numbers'],
            minLength: [6, 'Your veryfycode must have exactly 6 numbers']      
        },
        expiresAt: Date
    },
})

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
})
// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
// return jwt token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

// Generate password reset verifycode
userSchema.methods.getVerifyCode = function () {
    // Generate verifycode 6 numbers
    let verifycode = ""
    for (let i = 0; i < 6; i++) {
        verifycode += Math.floor(Math.random() * 10)
    }
    // Hash and set to code in verifycode field
    this.verifycode.code = crypto.createHash('sha256').update(verifycode).digest('hex');
    // Set token expire time
    this.verifycode.expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    return verifycode;
}
module.exports = mongoose.model('User', userSchema);