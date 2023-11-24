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
import { getRecords, newRecord, updateRecord, deleteRecord } from '../../actions/recordAction'

const List = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  const [open, openchange] = useState(false);
  const [title, titlechange] = useState('Tạo hồ sơ');
  const [isedit, iseditchange] = useState(false);
  const [isview, isviewchange] = useState(false);

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
  const [id, idchange] = useState('');
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
    isviewchange(false);
  }
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, records, recordsCount, filteredRecordsCount, resPerPage } = useSelector(state => state.record);
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
    fullnamechange('');
    birthdaychange('');
    genderchange('');
    identificationcardchange('');
    healthinsurancechange('');
    phonechange('');
    addresschange('');

    openchange(true);
    titlechange('Tạo hồ sơ');
    iseditchange(false);
  }
  const handleEdit = (record) => {
    idchange(record._id);
    fullnamechange(record.fullname);
    birthdaychange(new Date(record.birthday).toISOString().slice(0, 10));
    genderchange(record.gender)
    identificationcardchange(record.identificationcard);
    healthinsurancechange(record.healthinsurance);
    phonechange(record.phone);
    addresschange(record.address);

    openchange(true);
    titlechange('Chỉnh sửa hồ sơ');
    iseditchange(true);
  }
  const handleDialog = (e) => {
    e.preventDefault()
    if (isedit === false) {
      dispatch(newRecord(fullname, birthday, gender, identificationcard, healthinsurance, phone, address))
        .then(() => {
          openchange(false);
          toast.success("Tạo hồ sơ thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(getRecords(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else if (isedit === true) {
      dispatch(updateRecord(id, fullname, birthday, gender, identificationcard, healthinsurance, phone, address))
        .then(() => {
          openchange(false);
          toast.success("Cập nhật hồ sơ thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          iseditchange(false);
          dispatch(getRecords(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  }
  const handleView = (record) => {
    isviewchange(true);
    openchange(true);
    titlechange('Xem chi tiết hồ sơ');

    fullnamechange(record.fullname);
    birthdaychange(new Date(record.birthday).toISOString().slice(0, 10));
    genderchange(record.gender)
    identificationcardchange(record.identificationcard);
    healthinsurancechange(record.healthinsurance);
    phonechange(record.phone);
    addresschange(record.address);
  }
  const handleDelete = (record) => {
    if (window.confirm(`Bạn có chắc muốn xóa hồ sơ của ${record.fullname}?`)) {
      dispatch(deleteRecord(record._id))
        .then(() => {
          toast.success("Xóa hồ sơ thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(getRecords(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
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
              <div className='recordList'>
                <h4 className='titleRecord'>DANH SÁCH HỒ SƠ</h4>
                <Button className="font-weight-bold" onClick={handleCreate} variant="contained">Tạo hồ sơ (+)</Button>
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
                      {records && records.map((record, index) => (
                        <TableRow key={record._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{record.fullname}</TableCell>
                          <TableCell>{record.phone}</TableCell>
                          <TableCell>{new Date(record.birthday).toLocaleDateString('en-GB')}</TableCell>
                          <TableCell>{record.address}</TableCell>
                          <TableCell>
                            <Button className='mr-2' onClick={() => handleEdit(record)} variant="contained" color="primary" title="Chỉnh sửa"><EditIcon /></Button>
                            <Button className='mr-2' onClick={() => { handleDelete(record) }} variant="contained" color="error" title="Xóa"><DeleteIcon /></Button>
                            <Button className='mr-2' onClick={() => { handleView(record) }} variant="contained" color="primary" title="Xem Chi tiết"><DetailsIcon /></Button>
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

          <Dialog open={open} fullWidth maxWidth="sm">
            <DialogTitle>
              <div className="flex-div"></div>
              <h3>{title}</h3>
              <div className="flex-div">
                <IconButton onClick={closepopup}> <CloseIcon /></IconButton>
              </div>
            </DialogTitle>
            <DialogContent>
              <form onSubmit={handleDialog}>
                <Stack spacing={2} margin={2}>
                  <TextField disabled={isview} required error={fullname === '' || fullname.length > 30} helperText="Họ và tên không được quá 30 ký tự" value={fullname} onChange={e => { fullnamechange(e.target.value) }} variant="outlined" label="Họ và tên"></TextField>
                  <TextField disabled={isview} required error={birthday === ''} label='Ngày sinh' type='date' fullWidth name='birthday' value={birthday} InputLabelProps={{ shrink: true }} style={{ marginLeft: 'auto' }} onChange={e => { birthdaychange(e.target.value) }} />
                  <FormControl disabled={isview} fullWidth required error={gender === ''} >
                    <InputLabel>Giới tính</InputLabel>
                    <Select label="Giới tính" name='gender' value={gender} onChange={e => { genderchange(e.target.value) }}>
                      <MenuItem value={'Nam'}>Nam</MenuItem>
                      <MenuItem value={'Nữ'}>Nữ</MenuItem>
                      <MenuItem value={'Khác'}>Khác</MenuItem>
                    </Select>
                  </FormControl>
                  <TextField disabled={isview} required error={identificationcard.length !== 12} helperText="Số CCCD phải đúng 12 ký tự" value={identificationcard} name='identificationcard' onChange={handleNumberChange} variant="outlined" label="Số CCCD"></TextField>
                  <TextField disabled={isview} required error={healthinsurance.length !== 15} helperText="Số thẻ BHYT phải đúng 15 ký tự" value={healthinsurance} onChange={e => { healthinsurancechange(e.target.value) }} variant="outlined" label="Số thẻ BHYT"></TextField>
                  <TextField disabled={isview} required error={phone.length !== 10} value={phone} helperText="Số điện thoại phải đúng 10 ký tự" name='phone' onChange={handleNumberChange} variant="outlined" label="Số điện thoại"></TextField>
                  <TextField disabled={isview} required error={address === ''} value={address} onChange={e => { addresschange(e.target.value) }} variant="outlined" label="Địa chỉ"></TextField>
                  {!isview && (<Button variant="contained" type="submit">Lưu</Button>)}
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
