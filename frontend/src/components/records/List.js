import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useParams } from 'react-router-dom';
import { Select, InputLabel, FormControl, MenuItem, Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, IconButton, DialogContent, TextField, Stack, RadioGroup, Checkbox, FormControlLabel, Radio } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { getRecords } from '../../actions/recordAction'

const List = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  const [open, openchange] = useState(false);
  const [title, titlechange] = useState('Tạo hồ sơ');
  const [isedit, iseditchange] = useState(false);

  //
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'fullname', name: 'Họ và tên' },
    { id: 'phone', name: 'Số điện thoại' },
    { id: 'birthday', name: 'Ngày sinh' },
    { id: 'address', name: 'Địa chỉ' },
    { id: 'action', name: 'Hành động' }
  ]
  // 
  const [fullname, fullnamechange] = useState('');
  const [birthday, birthdaychange] = useState('');
  const [gender, genderchange] = useState('');
  const [identificationcard, identificationcardchange] = useState('');
  const [healthinsurance, healthinsurancechange] = useState('');
  const [phone, phonechange] = useState('');
  const [address, addresschange] = useState('');

  //
  const closepopup = () => {
    openchange(false);
  }
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, records, recordsCount, resPerPage, filteredRecordsCount } = useSelector(state => state.record);
  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(getRecords(keyword, currentPage));
  }, [dispatch, error, toast, keyword, currentPage]);
  //
  let count = recordsCount;
  if (keyword) {
    count = filteredRecordsCount
  }
  const handleCreate = () => {
    openchange(true);
    titlechange('Tạo hồ sơ');
    iseditchange(false);
  }
  const handleNumberChange = (event) => {
    if (!isNaN(event.target.value)) {
      if (event.target.name === 'identificationcard') {
        identificationcardchange(event.target.value);
      } else if (event.target.name === 'phone') {
        phonechange(event.target.value);
      }
    }
  }
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <Fragment>
      <MetaData title={'Hồ sơ khám bệnh'} />
      {loading ? <Loader /> : (
        <Fragment>
          <Grid className='mt-5'>
            <Paper elevation={15} className='paperList'>
              <div className='recordList' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h4 className='titleRecord'>DANH SÁCH HỒ SƠ</h4>
                <Button className="font-weight-bold" onClick={handleCreate} variant="contained" style={{ alignSelf: 'flex-end' }}>Tạo hồ sơ (+)</Button>
              </div>
              <div className='paperList'>
                <TableContainer style={{ borderRadius: '5px' }}>
                  <Table>
                    <TableHead>
                      <TableRow className='tableRowList'>
                        {columns.map((column) =>
                          <TableCell className="font-weight-bold" key={column.id} style={{ color: 'white' }}>{column.name}</TableCell>
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {records && records.map((record, index) => (
                        <TableRow key={record._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{record.fullname}</TableCell>
                          <TableCell>{record.phone}</TableCell>
                          <TableCell>{new Date(record.birthday).toLocaleDateString('en-GB')}</TableCell>
                          <TableCell>{record.address}</TableCell>
                          <TableCell>
                            <Button className='mr-2' onClick={() => { console.log(record._id) }} variant="contained" color="primary" title="Chỉnh sửa"><EditIcon /></Button>
                            <Button className='mr-2' onClick={() => { }} variant="contained" color="error" title="Xóa"><DeleteIcon /></Button>
                            <Button className='mr-2' onClick={() => { }} variant="contained" color="primary" title="Xem Chi tiết"><DetailsIcon /></Button>
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
                  rowsPerPage={records.length}
                  page={currentPage}
                  onPageChange={handlePageChange}
                >
                </TablePagination>
              </div>
            </Paper>
          </Grid>

          <Dialog open={open} onClose={() => { }} fullWidth maxWidth="sm">
            <DialogTitle style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ flex: 1 }}></div>
              <h3>{title}</h3>
              <div style={{ flex: 1 }}>
                <IconButton onClick={closepopup} style={{ float: 'right' }}> <CloseIcon /></IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={() => { }}>
                <Stack spacing={2} margin={2}>
                  <TextField required error={fullname.length === 0} value={fullname} onChange={e => { fullnamechange(e.target.value) }} variant="outlined" label="Họ và tên"></TextField>
                  <TextField required error={birthday === ''} label='Ngày sinh' type='date' fullWidth name='birthday' value={birthday} InputLabelProps={{ shrink: true }} style={{ marginLeft: 'auto' }} onChange={e => { birthdaychange(e.target.value) }} />
                  <FormControl fullWidth required error={gender === ''} >
                    <InputLabel>Giới tính</InputLabel>
                    <Select label="Giới tính" name='gender' value={gender} onChange={e => { genderchange(e.target.value) }}>
                      <MenuItem value={'Nam'}>Nam</MenuItem>
                      <MenuItem value={'Nữ'}>Nữ</MenuItem>
                      <MenuItem value={'Khác'}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField required error={identificationcard === ''} value={identificationcard} name='identificationcard' onChange={handleNumberChange} variant="outlined" label="Số CCCD"></TextField>
                  <TextField required error={healthinsurance === ''} value={healthinsurance} onChange={e => { healthinsurancechange(e.target.value) }} variant="outlined" label="Số thẻ BHYT"></TextField>
                  <TextField required error={phone === ''} value={phone} name='phone' onChange={handleNumberChange} variant="outlined" label="Số điện thoại"></TextField>
                  <TextField required error={address === ''} value={address} onChange={e => { addresschange(e.target.value) }} variant="outlined" label="Địa chỉ"></TextField>
                  <Button variant="contained" type="submit">Tạo</Button>
                </Stack>
              </form>
            </DialogContent>
          </Dialog>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default List
