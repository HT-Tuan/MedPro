const Doctor = require('../models/doctor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

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
    const currentDay = now.getDate();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const nextMonth = currentMonth + 1 > 12 ? 1 : currentMonth + 1;

    const scheduled = doctor.schedule.filter(item => {
        return (item.date.getDay() > currentDay && item.date.getMonth() === currentMonth && item.date.getFullYear() === currentYear) ||
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

// admin
// Create new doctor => /api/medpro/admin/doctor/new
exports.newDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.create(req.body);
    res.status(201).json({
        success: true,
        doctor
    })
})
// Get doctor details => /api/medpro/admin/doctor/:id
exports.getDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    res.status(200).json({
        success: true,
        doctor
    })
})
// Update doctor details => /api/medpro/admin/doctor/:id
exports.updateDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    const result = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        result
    })
})
// Delete doctor => /api/medpro/admin/doctor/:id
exports.deleteDoctor = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    await Doctor.deleteOne({ _id: req.params.id })
    res.status(200).json({
        success: true,
        message: 'Doctor is deleted'
    })
})