const User = require('../models/user');
const Record = require('../models/record');
const Ticket = require('../models/ticket');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const path = require('path');
const pug = require('pug');


// Book ticket => /api/medpro/ticket/book/:doctor/:record/:time
exports.bookTicket = catchAsyncErrors(async (req, res, next) => {
  const record = await Record.findById(req.params.record);
  if (!record) {
    return next(new ErrorHandler('Record not found', 404));
  }
  const doctor = await Doctor.findById(req.params.doctor);
  if (!doctor) {
    return next(new ErrorHandler('Doctor not found', 404));
  }
  const scheduled = doctor.schedule.find(item => item.date.toISOString().slice(0, 10) === req.body.date);
  if (!scheduled) {
    return next(new ErrorHandler('Schedule not found', 404));
  }
  const limitBooking = 100;
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
    id_patient: record._id,
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

// admin
// Get all tickets => /api/medpro/admin/tickets
exports.getTickets = catchAsyncErrors(async (req, res, next) => {
  const tickets = await Ticket.find();
  let totalAmount = 0;
  tickets.forEach(ticket => {
    totalAmount += ticket.price;
  })
  res.status(200).json({
    success: true,
    totalAmount,
    tickets
  })
})

// Statistics on the number of tickets by month => /api/medpro/admin/tickets/statistics
exports.statisticsTickets = catchAsyncErrors(async (req, res, next) => {
  const begin_date = new Date(req.body.begin_date);
  const end_date = new Date(req.body.end_date);
  if (begin_date > end_date) {
    return next(new ErrorHandler('Begin date must be less than end date', 400));
  }

  const tickets = await Ticket.find({
    createdAt: {
      $gte: begin_date,
      $lte: end_date
    }
  });
  const statistics = [];
  let current = begin_date;
  current.setDate(1);
  let end = end_date;
  end.setDate(1);
  while (current <= end) {
    let count = 0;
    tickets.forEach(ticket => {
      if (ticket.createdAt.getMonth() === current.getMonth() && ticket.createdAt.getFullYear() === current.getFullYear()) {
        count++;
      }
    })
    statistics.push({
      month: current.getMonth() + 1,
      year: current.getFullYear(),
      count
    })
    current.setMonth(current.getMonth() + 1);
  }
  res.status(200).json({
    success: true,
    statistics
  })
})

// Update status ticket => /api/medpro/admin/ticket/:id
exports.updateTicket = catchAsyncErrors(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorHandler('Ticket not found', 404));
  }
  if (ticket.status === 'complete') {
    return next(new ErrorHandler('Ticket has been completed', 400));
  }
  ticket.status = req.body.status;
  await ticket.save();
  res.status(200).json({
    success: true
  })
})

// Delete ticket => /api/medpro/admin/ticket/:id
exports.deleteTicket = catchAsyncErrors(async (req, res, next) => {
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    return next(new ErrorHandler('Ticket not found', 404));
  }
  await Ticket.deleteOne({ _id: ticket._id });
  res.status(200).json({
    success: true
  })
})