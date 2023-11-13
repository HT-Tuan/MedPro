const Doctor = require('../models/doctor');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Get all doctors => /api/medpro/doctors
exports.getDoctors = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4;
    const doctorsCount = await Doctor.countDocuments();
    const apiFeatures = new APIFeatures(Doctor.find(), req.query)
        .search()
        .pagination(resPerPage);
    const doctors = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: doctors.length,
        doctorsCount,
        doctors
    })
})

//Get scheduled doctors => /api/medpro/doctors/scheduled:id
exports.getScheduledDoctors = catchAsyncErrors(async (req, res, next) => {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
        return next(new ErrorHandler('Doctor not found', 404));
    }
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const scheduledThisMonth = doctor.schedule.filter(item => {
        return item.date.getMonth() === currentMonth && item.date.getFullYear() === currentYear;
    });
    res.status(200).json({
        success: true,
        scheduledThisMonth
    })
})

// Create titker => /api/medpro/titker/new
exports.createTitker = catchAsyncErrors(async (req, res, next) => {
    const titker = await Titker.create(req.body);
    res.status(201).json({
        success: true,
        titker
    })
})