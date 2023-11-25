const Record = require('../models/record');
const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new record => /api/medpro/record/new
exports.newRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.create(req.body);
    await User.findOneAndUpdate({ _id: req.user.id }, { $push: { record: record._id } } )
    res.status(201).json({
        success: true,
        record
    })
})

// Get all records => /api/medpro/records
exports.getRecords = catchAsyncErrors(async (req, res, next) => {
    // Pagination
    const resPerPage = 8;
    const currentPage = Number(req.query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    //
    const keyword = req.query.keyword || '';
    
    const user = await req.user.populate('record');
    //
    const recordCount = user.record.length;
    const recordTemp = user.record.filter(record => {
        return record.fullname.toLowerCase().includes(keyword.toLowerCase());
    })
    const filteredRecordsCount = recordTemp.length;
    const records = recordTemp.slice(skip, skip + resPerPage);
    //
    res.status(200).json({
        success: true,
        records,
        recordCount,
        resPerPage,
        filteredRecordsCount
    })
})

// Get all ticket => /api/medpro/tickets
exports.getTickets = catchAsyncErrors(async (req, res, next) => {
    // Pagination
    const resPerPage = 4;
    const currentPage = Number(req.query.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    //
    const keyword = req.query.keyword || 'wait';

    const user = await req.user.populate('ticket');
    //
    const ticketCount = user.ticket.length;
    const ticketTemp = user.ticket.filter(ticket => {
        return ticket.status.toLowerCase().includes(keyword.toLowerCase());
    })
    const filteredTicketsCount = ticketTemp.length;
    const tickets = ticketTemp.slice(skip, skip + resPerPage);
    //
    res.status(200).json({
        success: true,
        tickets,
        ticketCount,
        resPerPage,
        filteredTicketsCount
    })
})

// Update record details => /api/medpro/record/:id
exports.updateRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.id);

    if (!record) {
        return next(new ErrorHandler('Record not found', 404));
    }
    if (!req.user.record.includes(req.params.id)) {
        return next(new ErrorHandler('You are not authorized to access this record', 401));
    }

    const result = await Record.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        result
    })
})

// Delete record => /api/medpro/record/:id
exports.deleteRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.id);

    if (!record) {
        return next(new ErrorHandler('Record not found', 404));
    }
    if (!req.user.record.includes(req.params.id)) {
        return next(new ErrorHandler('You are not authorized to access this record', 401));
    }
    await Record.deleteOne({ _id: req.params.id })
    res.status(200).json({
        success: true,
        message: 'Record is deleted'
    })
})
