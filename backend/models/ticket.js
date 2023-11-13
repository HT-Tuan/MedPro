const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    serial: {
        type: String,
        require: [true, 'Please enter serial']
    },
    category: {
        type: String,
        required: [true, 'Please select category for this ticket.'],
        enum: {
            values: ['normal', 'vip'],
            message: 'Please select correct category for ticket'
        },
        default: 'vip'
    },
    area: {
        type: String,
        required: [true, 'Please select area for this ticket.'],
        enum: {
            values: ['A', 'B', 'C'],
            message: 'Please select correct area for ticket'
        }
    },
    clinic: {
        type: String,
        required: [true, 'Please enter clinic for this ticket.'],
        maxLength: [3, 'Your clinic cannot exceed 3 characters']
    },
    specialist: {
        type: String,
        required: [true, 'Please select specialist for this ticket.'],
        enum: {
            values: ['Khoa Nội', 'Khoa Ngoại', 'Khoa Nhi'],
            message: 'Please select correct department for ticket'
        }
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: 'Doctor'
    },
    date: {
        type: Date,
        require: [true, 'Please enter date'],
    },
    time: {
        type: String,
        require: [true, 'Please enter time'],

    },
    price: {
        type: Number,
        required: [true, 'Please enter price for this ticket.'],
        maxLength: [5, 'Your price cannot exceed 5 characters'],
        default: 150.0
    },
    status: {
        type: String,
        required: [true, 'Please select status for this ticket.'],
        enum: {
            values: ['wait', 'complete', 'cancel'],
            message: 'Please select correct status for ticket'
        },
        default: 'wait'
    },
})

module.exports = mongoose.model('Ticket', ticketSchema);