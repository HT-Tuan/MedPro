const Doctor = require('../models/doctor');
const Record = require('../models/record');
const Ticket = require('../models/ticket');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const sendEmail = require('../utils/sendEmail');
const APIFeatures = require('../utils/apiFeatures');

// Get all doctors => /api/medpro/doctors
exports.getDoctors = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 4;
    const doctorsCount = await Doctor.countDocuments();
    const apiFeatures = new APIFeatures(Doctor.find(), req.query)
        .search()
        .pagination(resPerPage);
    const doctorTemp = await apiFeatures.query;
    const doctors = doctorTemp.map(doctor => ({
        _id: doctor._id,
        fullname: doctor.fullname,
        gender: doctor.gender,
        specialist: doctor.specialist,
        schedule: doctor.schedule.length,
        price: doctor.price
    }));
    res.status(200).json({
        success: true,
        count: doctors.length,
        doctorsCount,
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

// Book ticket => /api/medpro/doctor/book/:id/:record/:date/:time
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
        clinic: req.body.clinic,
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
    // Send ticket via email
    const message =
        `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <title>MEDPRO - Xác nhận Phiếu Khám Bệnh: ${ticket._id} </title>
    </head>
    <body>
    <div style="font: small/1.5 Arial,Helvetica,sans-serif; overflow: hidden;">
        <u></u>
        <p>
        Cám ơn bạn đã sử dụng dịch vụ đăng ký khám bệnh trực tuyến của chúng tôi, đây là phiếu khám bệnh của bạn, số thứ tự
        khám
        là
        <b> ${ticket.serial} </b>
        <br>
        Vui lòng mang theo phiếu khám bệnh này khi đến khám tại bệnh viện. Xin chân thành cám ơn!
        </p>
        <table
        style="border-collapse:collapse;table-layout:fixed;border-spacing:0;vertical-align:top;min-width:320px;Margin:0 auto;background-color:#ffffff;width:100%"
        cellpadding="0" cellspacing="0">
        <tbody>
            <tr style="vertical-align:top">
            <td style="word-break:break-word;border-collapse:collapse!important;vertical-align:top">
                <div style="background-color:transparent">
                <div
                    style="Margin:0 auto;min-width:320px;max-width:500px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                    <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                    <div style="min-width:320px;max-width:500px;display:table-cell;vertical-align:top">
                        <div style="background-color:transparent;width:100%!important">
                        <div
                            style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0px;padding-left:0px">
                            <div align="center" style="padding-right:0px;padding-left:0px">
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div style="background-color:transparent">
                <div
                    style="Margin:0 auto;min-width:320px;max-width:500px;word-wrap:break-word;word-break:break-word;background-color:transparent">
                    <div style="border-collapse:collapse;display:table;width:100%;background-color:transparent">
                    <div style="min-width:320px;max-width:500px;display:table-cell;vertical-align:top">
                        <div style="background-color:transparent;width:100%!important">
                        <div
                            style="border-top:0px solid transparent;border-left:0px solid transparent;border-bottom:0px solid transparent;border-right:0px solid transparent;padding-top:5px;padding-bottom:5px;padding-right:0px;padding-left:0px">
                            <div
                            style="font-size:16px;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;text-align:center">
                            <div>
                                <table align="center"
                                style="margin:0 auto;width:325px;height:746px;border:5px solid #e0e6e8;padding:10px">
                                <tbody>
                                    <tr>
                                    <td style="text-align:center"><b>Bệnh viện MedPro TPHCM</b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:center">PHIẾU KHÁM BỆNH<br><i>(Mã phiếu: ${ticket._id})</i></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:center">${"Khám " + ticket.specialist + " Khu " + ticket.area} <br>Phòng khám: ${ticket.clinic}</td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:center">
                                        <p style="color:#48a7f2;font-size:100px;margin:20px 0;font-weight:bold">
                                        <b> ${ticket.serial} </b>
                                        </p>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Ngày khám: <b> ${ticket.date.toLocaleDateString() + " Buổi " + (req.params.time === 'am' ? 'Sáng' : 'Chiều')} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Giờ khám dự kiến: <b> ${ticket.time} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Họ tên: <b> ${ticket.fullname} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Giới tính: <b> ${ticket.gender} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Năm sinh: <b> ${ticket.birthday.toLocaleDateString()} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Tỉnh/TP: <b> ${ticket.address} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">BHYT: <b> ${ticket.category === "vip" ? "Không" : ticket.healthinsurance} </b></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left"><i>Vui lòng đến trực tiếp phòng khám trước giờ hẹn 15-30
                                        phút
                                        để khám bệnh.</i></td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">Tiền khám: <b> ${ticket.price}.000 đồng</b></td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <hr style="color:#e0e6e8;margin-bottom:1px;margin-top:1px">
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">
                                        Số hồ sơ (Mã số bệnh nhân):<br> <b> ${record._id} </b>
                                    </td>
                                    </tr>
                                    <tr>
                                    <td style="text-align:left">
                                        <i>Ghi chú: Phiếu khám bệnh chỉ có giá trị trong ngày khám từ <b>6h30 - 16h30</b>.</i>
                                    </td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </td>
            </tr>
        </tbody>
        </table>
    </div>
    </body>
    </html>`
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