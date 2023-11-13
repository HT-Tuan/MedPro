const Record = require('../models/record');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create new record => /api/medpro/record/new
exports.newRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.create(req.body);
    req.user.record = record._id;
    await req.user.save();
    res.status(201).json({
        success: true,
        record
    })
})

// Get all records => /api/medpro/records
exports.getRecords = catchAsyncErrors(async (req, res, next) => {
    const user = await req.user.populate('record');
    const records = user.record;
    res.status(200).json({
        success: true,
        records
    })
})

// Get record details => /api/medpro/record/:id
exports.getRecord = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.id);
    if (!record) {
        return next(new ErrorHandler('Record not found', 404));
    }
    if (!req.user.record.includes(req.params.id)) {
        return next(new ErrorHandler('You are not authorized to access this record', 401));
    }
    res.status(200).json({
        success: true,
        record
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