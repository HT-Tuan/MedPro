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
  const { tickets, error, loading, success, resPerPage, filteredTicketsCount } = useSelector(state => state.tickets)
  const [currentPage, setCurrentPage] = useState(0)

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
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const handleView = (record) => {
    // dispatch(deleteRecord(record._id))
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
      </Fragment>
    </Fragment>
  )
}

export default Ticket
