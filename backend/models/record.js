const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Please enter your fullname'],
        maxLength: [30, 'Your fullname cannot exceed 30 characters']
    },
    birthday: {
        type: Date,
        require: [true, 'Please enter your birthday']
    },
    gender: {
        type: String,
        required: [true, 'Please select gender for this doctor'],
        enum: {
            values: ['Nam', 'Nữ', 'Khác'],
            message: 'Please select correct title for doctor'
        }
    },
    identificationcard: {
        type: String,
        unique: true,
        require: [true, 'Please enter your identification card'],
        maxLength: [12, 'Your identificationcard must have exactly 12 characters'],
        minLength: [12, 'Your identificationcard must have exactly 12 characters']
    },
    healthinsurance: {
        type: String,
        require: [true, 'Please enter your health insurance'],
        maxLength: [15, 'Your identificationcard must have exactly 15 characters'],
        minLength: [15, 'Your identificationcard must have exactly 15 characters']
    },
    phone: {
        type: String,
        require: [true, 'Please enter your phone'],
        maxLength: [10, 'Your identificationcard must have exactly 10 characters'],
        minLength: [10, 'Your identificationcard must have exactly 10 characters']
    },
    address: {
        type: String,
        require: [true, 'Please enter your address']
    }
})

module.exports = mongoose.model('Record', recordSchema);