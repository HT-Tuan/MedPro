import React, { Fragment, useEffect, useState } from 'react'

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { Select, InputLabel, FormControl, MenuItem, Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, IconButton, DialogContent, TextField, Stack, RadioGroup, Checkbox, FormControlLabel, Radio } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';
import { Link } from 'react-router-dom'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'
import { getTickets, clearErrors } from '../../actions/ticketAction'

const Ticket = () => {
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'serial', name: 'Số chờ khám' },
    { id: 'clinic', name: 'Phòng khám' },
    { id: 'fullname', name: 'Người bệnh' },
    { id: 'date', name: 'Ngày khám' },
    { id: 'action', name: 'Hành động' }
  ]
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch()
  const { tickets, error, loading, patient_id, resPerPage, filteredTicketsCount } = useSelector(state => state.tickets)
  const [currentPage, setCurrentPage] = useState(0)
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_LEFT
      });
      dispatch(clearErrors())
      return;
    }
    let keyword = '';
    keyword = value === '1' ? 'wait' : 'complete'
    dispatch(getTickets(keyword, currentPage))
  }, [dispatch, toast, error, value, currentPage])
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
                                    <td style="text-align:left">Ngày khám: <b> ${new Date(ticket.date).toLocaleDateString('en-GB') + " Buổi " + (ticket.time === '7:00' ? 'Sáng' : 'Chiều')} </b></td>
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
                                    <td style="text-align:left">Năm sinh: <b> ${new Date(ticket.birthday).toLocaleDateString('en-GB')} </b></td>
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
      <MetaData title={'Phiếu khám'} />
      <Box className="mt-2" sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Chờ khám" value="1" />
              <Tab label="Đã khám" value="2" />
            </TabList>
          </Box>
        </TabContext>
      </Box>
      <Fragment>
        {loading ? <Loader /> : (
          <Fragment>
            <Grid className='mt-5'>
              <Paper elevation={15} className='paperList'>
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
                            <TableCell>{new Date(ticket.date).toLocaleDateString('en-GB')}</TableCell>
                            <TableCell>
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
                    count={filteredTicketsCount}
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
        )}
        <p className='mb-5'></p>
        <Link to={`/`} className="button-back">Trở lại</Link>
      </Fragment>
    </Fragment>
  )
}

export default Ticket