const Doctor = require('../models/doctor');
const User = require('../models/user');
const Record = require('../models/record');
const Ticket = require('../models/ticket');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const APIFeatures = require('../utils/apiFeatures');
const path = require('path');
const pug = require('pug');

// Get all doctors => /api/medpro/doctors
exports.getDoctors = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 6;
    const doctorCount = await Doctor.countDocuments();

    const apiFeatures1 = new APIFeatures(Doctor.find(), req.query)
        .search();

    const doctorTemp1 = await apiFeatures1.query;
    const filteredDoctorsCount = doctorTemp1.length;

    const apiFeatures2 = new APIFeatures(Doctor.find(), req.query)
        .search()
        .pagination(resPerPage);
    const doctorTemp2 = await apiFeatures2.query;

    const doctors = doctorTemp2.map(doctor => ({
        _id: doctor._id,
        title: doctor.title,
        fullname: doctor.fullname,
        gender: doctor.gender,
        specialist: doctor.specialist,
        schedule: doctor.schedule.length,
        price: doctor.price
    }));
    res.status(200).json({
        success: true,
        doctorCount,
        resPerPage,
        filteredDoctorsCount,
        doctors
    })
})

//Get scheduled doctors => /api/medpro/doctor/scheduled:id
exports.getScheduledDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const nextMonth = currentMonth + 1 > 12 ? 1 : currentMonth + 1;

    const scheduled = doctor.schedule.filter(item => {
        return (item.date.getMonth() === currentMonth && item.date.getFullYear() === currentYear) ||
            (item.date.getMonth() === nextMonth && item.date.getFullYear() === (nextMonth === 1 ? currentYear + 1 : currentYear));
    }).map(item => ({
        _id: item._id,
        date: item.date
    }));
    res.status(200).json({
        success: true,
        doctorId: doctor._id,
        scheduled
    })
})

// Get Single Scheduled Doctor => /api/medpro/doctor/scheduled/:id/:date
exports.getSingleScheduledDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    let scheduled = doctor.schedule.find(item => item._id.toString() === req.params.date);
    if (!scheduled) {
        return next(new ErrorHandler('Schedule not found', 404));
    }
    scheduled = {
        _id: scheduled._id,
        countam: scheduled.countam,
        countpm: scheduled.countpm,
        clinic: scheduled.clinic
    }
    res.status(200).json({
        success: true,
        doctorId: doctor._id,
        scheduled
    })
})

// Book ticket => /api/medpro/doctor/book/:doctor/:record/:date/:time
exports.bookTicket = catchAsyncErrors(async (req, res, next) => {
    const record = await Record.findById(req.params.record);
    if (!record) {
        return next(new ErrorHandler('Record not found', 404));
    }
    const doctor = await Doctor.findById(req.params.doctor);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    const scheduled = doctor.schedule.find(item => item._id.toString() === req.params.date);
    if (!scheduled) {
        return next(new ErrorHandler('Schedule not found', 404));
    }
    const limitBooking = 20;
    let serialBooking = 0;
    switch (req.params.time) {
        case 'am':
            if (scheduled.countam >= limitBooking) {
                return next(new ErrorHandler('Schedule is full', 400));
            }
            serialBooking = scheduled.countam + 1;
            scheduled.countam += 1;
            break;
        case 'pm':
            if (scheduled.countpm >= limitBooking) {
                return next(new ErrorHandler('Schedule is full', 400));
            }
            serialBooking = scheduled.countam + 1;
            scheduled.countpm += 1;
            break;
        default:
            return next(new ErrorHandler('Time not found', 404));
    }
    const ticket = await Ticket.create({
        serial: serialBooking,
        category: req.body.category,
        area: req.body.area,
        clinic: scheduled.clinic,
        specialist: doctor.specialist,
        doctor: doctor._id,
        date: scheduled.date,
        time: req.params.time === 'am' ? '7:00' : '13:00',
        price: doctor.price,
        // status: 'wait' // value default
        fullname: record.fullname,
        birthday: record.birthday,
        gender: record.gender,
        healthinsurance: record.healthinsurance,
        address: record.address
    });
    await User.findOneAndUpdate({ _id: req.user.id }, { $push: { ticket: ticket._id } })
    // Send ticket via email
    const templatePath = path.join(__dirname, '../templates/BookTicket.pug');
    const compiledFunction = pug.compileFile(templatePath);
    const message = compiledFunction({ ticket, req, record });
    try {
        await sendEmail({
            email: req.user.email,
            subject: 'Medpro Ticket Booking',
            message
        })
    } catch (error) {
        // delete ticket
        await Ticket.deleteOne({ _id: ticket._id });
        return next(new ErrorHandler(error.message, 500));
    }
    await doctor.save();
    res.status(200).json({
        success: true,
        ticket
    })
})