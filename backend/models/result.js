const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Please enter patient name'],
        maxLength: [30, 'Your patient name cannot exceed 30 characters']
    },
    diagnosis: {
        type: String,
        required: [true, 'Please enter diagnosis'],
        maxLength: [50, 'Your diagnosis cannot exceed 30 characters']
    },
    date: {
        type: Date,
        require: [true, 'Please enter date'],
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})