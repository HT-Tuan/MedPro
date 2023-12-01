import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useParams } from 'react-router-dom';
import { Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { getAdminTickets, updateStatusTicket, deleteTicket, clearErrors } from '../../actions/ticketAction'
import Sidebar from './Sidebar'

const TicketAdmin = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  //
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'serial', name: 'Số chờ khám' },
    { id: 'clinic', name: 'Phòng khám' },
    { id: 'fullname', name: 'Người bệnh' },
    { id: 'date', name: 'Ngày khám' },
    { id: 'status', name: 'Trạng thái' },
    { id: 'action', name: 'Hành động' }
  ]
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, tickets, ticketCount, filteredTicketsCount, resPerPage } = useSelector(state => state.adminTickets);
  const { success } = useSelector(state => state.adminUpdateStatusTicket);
  const { successDelete } = useSelector(state => state.adminDeleteTicket);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      clearErrors();
      return;
    }
    dispatch(getAdminTickets(keyword, currentPage));
  }, [dispatch, success, successDelete, error, toast, keyword, currentPage]);
  //
  let count = ticketCount;
  if (keyword) {
    count = filteredTicketsCount
  }
  const handleEdit = (ticket) => {
    dispatch(updateStatusTicket(ticket._id));
    toast.success("Cập nhật trạng thái phiếu khám thành công", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
  const handleDelete = (ticket) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phiếu khám này?') === true) {
      dispatch(deleteTicket(ticket._id));
      toast.success("Xóa phiếu khám thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  }
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleView = (ticket) => {
    const htmlContent =
      `<!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <link rel="icon" href="${process.env.PUBLIC_URL}/images/logo.ico" />
        <title>MEDPRO - Xác nhận Phiếu Khám Bệnh: ${ticket._id} </title>
    </head>
    <body>
    <div style="font: small/1.5 Arial,Helvetica,sans-serif; overflow: hidden;">
        <u></u>
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
                                    <td style="text-align:left">Ngày khám: <b> ${new Date(ticket.date).toLocaleDateString('vi-VN') + " Buổi " + (ticket.time === '7:00' ? 'Sáng' : 'Chiều')} </b></td>
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
                                    <td style="text-align:left">Năm sinh: <b> ${new Date(ticket.birthday).toLocaleDateString('vi-VN')} </b></td>
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
                                        Số hồ sơ (Mã số bệnh nhân):<br> <b> ${ticket.id_patient} </b>
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
    const newWindow = window.open('', '_blank')
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  }
  return (
    <Fragment>
      <MetaData title={'Quản lý phiếu khám'} />
      {loading ? <Loader /> : (
        <div className='row'>
          <div className="col-12 col-md-2">
            <Sidebar />
          </div>
          <div className="col-12 col-md-10">
            <Fragment>
              <Grid className='mt-5'>
                <Paper elevation={15} className='paperList'>
                  <div className='recordList'>
                    <h4 className='titleRecord'>DANH SÁCH PHIẾU KHÁM</h4>
                  </div>
                  <div className='paperList'>
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow className='tableRowList'>
                            {columns.map((column) =>
                              <TableCell className="font-weight-bold" key={column.id}>{column.name}</TableCell>
                            )}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tickets && tickets.map((ticket, index) => (
                            <TableRow key={ticket._id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{ticket.serial}</TableCell>
                              <TableCell>{ticket.clinic}</TableCell>
                              <TableCell>{ticket.fullname}</TableCell>
                              <TableCell>{new Date(ticket.date).toLocaleDateString('vi-VN')}</TableCell>
                              <TableCell>{ticket.status === "wait" ? "Chờ khám" : "Đã khám"}</TableCell>
                              <TableCell>
                                {ticket.status === "wait" ? <Button className='mr-2' onClick={() => handleEdit(ticket)} variant="contained" color="primary" title="Cập nhật đã khám"><CheckCircleOutlineIcon /></Button> :
                                  <Button className='mr-2' variant="contained" disabled title="Chỉnh sửa"><CheckCircleOutlineIcon /></Button>}
                                <Button className='mr-2' onClick={() => { handleDelete(ticket) }} variant="contained" color="error" title="Xóa"><DeleteIcon /></Button>
                                <Button className='mr-2' onClick={() => { handleView(ticket) }} variant="contained" color="primary" title="Xem Chi tiết"><DetailsIcon /></Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[]}
                      component="div"
                      count={count}
                      rowsPerPage={resPerPage}
                      page={currentPage}
                      onPageChange={handlePageChange}
                    >
                    </TablePagination>
                  </div>
                </Paper>
              </Grid>
              <ToastContainer />
            </Fragment>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default TicketAdmin
