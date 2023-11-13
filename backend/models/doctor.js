const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter fullname for this doctor'],
        maxLength: [30, 'Fullname cannot exceed 30 characters']
    },
    title: {
        type: String,
        required: [true, 'Please select title for this doctor'],
        enum: {
            values: ['ThS', 'CKI', 'CKII'],
            message: 'Please select correct title for doctor'
        }
    },
    gender: {
        type: String,
        required: [true, 'Please select gender for this doctor'],
        enum: {
            values: ['Nam', 'Nữ', 'Khác'],
            message: 'Please select correct title for doctor'
        }
    },
    specialist: {
        type: String,
        required: [true, 'Please select specialist for this doctor.'],
        enum: {
            values: ['Khoa Nội', 'Khoa Ngoại', 'Khoa Nhi'],
            message: 'Please select correct department for doctor'
        }
    },
    price: {
        type: Number,
        required: [true, 'Please enter price for this doctor.'],
        maxLength: [5, 'Your price cannot exceed 5 characters'],
        default: 150.0
    },
    schedule: [{
        date: {
            type: Date,
            require: [true, 'Please enter date'],
        },
        countam: {
            type: Number,
            require: [true, 'Please enter count am'],
            default: 0.0
        },
        countpm: {
            type: Number,
            require: [true, 'Please enter count pm'],
            default: 0.0
        }
    }]
})

module.exports = mongoose.model('Doctor', doctorSchema);