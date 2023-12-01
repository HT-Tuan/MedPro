import React, { Fragment, useState, useEffect } from 'react'
import Loader from '../layouts/Loader'
import MetaData from '../layouts/MetaData'
import { useParams } from 'react-router-dom';
import { Typography, Select, InputLabel, FormControl, MenuItem, Grid, Paper, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Dialog, DialogTitle, IconButton, DialogContent, TextField, Stack, RadioGroup, Checkbox, FormControlLabel, Radio } from '@mui/material'
import CloseIcon from "@mui/icons-material/Close"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DetailsIcon from '@mui/icons-material/Details';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import { getDoctors } from '../../actions/doctorAction'
import Sidebar from './Sidebar';
import { createDoctor, editDoctor, deleteDoctor } from '../../actions/doctorAction';

const DoctorAdmin = () => {
  document.body.style.backgroundColor = "#fff";
  const [currentPage, setCurrentPage] = useState(0)
  const [open, openchange] = useState(false);
  const [title, titlechange] = useState('Tạo hồ sơ');
  const [clinic, clinicchange] = useState('');
  const [isedit, iseditchange] = useState(false);
  const [isview, isviewchange] = useState(false);

  //
  const columns = [
    { id: 'stt', name: 'STT' },
    { id: 'title', name: 'Chức danh' },
    { id: 'fullname', name: 'Họ và tên' },
    { id: 'gender', name: 'Giới tính' },
    { id: 'specialist', name: 'Khoa' },
    { id: 'action', name: 'Hành động' }
  ]
  // 
  const [id, idchange] = useState('');
  const [date, datechange] = useState('');
  const [doctorTemp, setDoctor] = useState({
    titleDoctor: '',
    fullname: '',
    gender: '',
    specialist: '',
    price: '',
    schedule: '',
    schedules: [],
  })
  const { titleDoctor, fullname, gender, specialist, price, schedule, schedules } = doctorTemp;
  //
  const closepopup = () => {
    openchange(false);
    isviewchange(false);
  }
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { loading, error, doctors, doctorsCount, filteredDoctorsCount, resPerPage } = useSelector(state => state.doctor);

  useEffect(() => {
    if (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    dispatch(getDoctors(keyword, currentPage));
  }, [dispatch, error, toast, keyword, currentPage]);
  //
  let count = doctorsCount;
  if (keyword) {
    count = filteredDoctorsCount
  }
  const handleCreate = () => {
    const newDoctor = {
      titleDoctor: '',
      fullname: '',
      gender: '',
      specialist: '',
      price: '',
      schedule: '',
      schedules: [],
    }
    setDoctor(newDoctor)
    openchange(true);
    titlechange('Thêm bác sĩ');
    iseditchange(false);
  }
  const handleEdit = (doctor) => {
    const newDoctor = {
      titleDoctor: doctor.title,
      fullname: doctor.fullname,
      gender: doctor.gender,
      specialist: doctor.specialist,
      price: doctor.price,
      schedule: doctor.schedule,
      schedules: doctor.schedules,
    }
    setDoctor(newDoctor)
    idchange(doctor._id);
    openchange(true);
    titlechange('Chỉnh sửa thông tin');
    iseditchange(true);
  }
  const handleDialog = (e) => {
    e.preventDefault()
    if (fullname === '' || fullname.length > 30) {
      toast.error("Họ và tên không được quá 30 ký tự", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (titleDoctor === '') {
      toast.error("Chức danh không được để trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (gender === '') {
      toast.error("Giới tính không được để trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (specialist === '') {
      toast.error("Khoa không được để trống", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (isedit === false) {
      dispatch(createDoctor(id, doctorTemp))
        .then(() => {
          openchange(false);
          toast.success("Thêm bác sĩ thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          iseditchange(false);
          dispatch(getDoctors(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    } else if (isedit === true) {
      dispatch(editDoctor(id, doctorTemp))
        .then(() => {
          openchange(false);
          toast.success("Chỉnh sửa thông tin thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          iseditchange(false);
          dispatch(getDoctors(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  }
  const handleView = (doctor) => {
    isviewchange(true);
    openchange(true);
    titlechange('Xem chi tiết thông tin');
    const newDoctor = {
      titleDoctor: doctor.title,
      fullname: doctor.fullname,
      gender: doctor.gender,
      specialist: doctor.specialist,
      price: doctor.price,
      schedule: doctor.schedule,
      schedules: doctor.schedules,
    }
    setDoctor(newDoctor)
    iseditchange(false);
  }
  const handleDelete = (doctor) => {
    if (window.confirm(`Bạn có chắc muốn xóa bác sĩ ${doctor.fullname}?`)) {
      dispatch(deleteDoctor(doctor._id))
        .then(() => {
          toast.success("Xóa bác sĩ thành công", {
            position: toast.POSITION.TOP_RIGHT,
          });
          dispatch(getDoctors(keyword, currentPage));
        })
        .catch((error) => {
          toast.error(error.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    }
  }

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };
  const onChange = (e) => {
    setDoctor({ ...doctorTemp, [e.target.name]: e.target.value })
  }
  const onChangeDate = (e) => {
    datechange(e.target.value);
  }
  const addSchedule = () => {
    if (schedules.some(scheduleItem => new Date(scheduleItem.date).getTime() === new Date(date).getTime())) {
      toast.error("Ngày khám đã tồn tại", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    const newSchedule = {
      date: date,
      clinic: clinic
    }
    setDoctor({ ...doctorTemp, schedules: [...schedules, newSchedule] })
  }
  return (
    <Fragment>
      <MetaData title={'Quản lý bác sĩ'} />
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
                    <h4 className='titleRecord'>DANH SÁCH BÁC SĨ</h4>
                    <Button className="font-weight-bold" onClick={handleCreate} variant="contained">Thêm bác sĩ (+)</Button>
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
                          {doctors && doctors.map((doctor, index) => (
                            <TableRow key={doctor._id}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{doctor.title}</TableCell>
                              <TableCell>{doctor.fullname}</TableCell>
                              <TableCell>{doctor.gender}</TableCell>
                              <TableCell>{doctor.specialist}</TableCell>
                              <TableCell>
                                <Button className='mr-2' onClick={() => { handleEdit(doctor) }} variant="contained" color="primary" title="Chỉnh sửa"><EditIcon /></Button>
                                <Button className='mr-2' onClick={() => { handleDelete(doctor) }} variant="contained" color="error" title="Xóa"><DeleteIcon /></Button>
                                <Button className='mr-2' onClick={() => { handleView(doctor) }} variant="contained" color="primary" title="Xem Chi tiết"><DetailsIcon /></Button>
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
                      <TextField disabled={isview} required error={fullname === '' || fullname.length > 30} helperText="Họ và tên không được quá 30 ký tự" value={fullname} name='fullname' onChange={onChange} variant="outlined" label="Họ và tên"></TextField>
                      <FormControl disabled={isview} fullWidth required error={titleDoctor === ''} >
                        <InputLabel>Chức danh</InputLabel>
                        <Select label="Chức danh" name='titleDoctor' value={titleDoctor} onChange={onChange}>
                          <MenuItem value={'ThS'}>ThS</MenuItem>
                          <MenuItem value={'CKI'}>CKI</MenuItem>
                          <MenuItem value={'CKI'}>CKII</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl disabled={isview} fullWidth required error={gender === ''} >
                        <InputLabel>Giới tính</InputLabel>
                        <Select label="Giới tính" name='gender' value={gender} onChange={onChange}>
                          <MenuItem value={'Nam'}>Nam</MenuItem>
                          <MenuItem value={'Nữ'}>Nữ</MenuItem>
                          <MenuItem value={'Khác'}>Khác</MenuItem>
                        </Select>
                      </FormControl>
                      <FormControl disabled={isview} fullWidth required error={specialist === ''} >
                        <InputLabel>Khoa</InputLabel>
                        <Select label="Khoa" name='specialist' value={specialist} onChange={onChange}>
                          <MenuItem value={'Khoa Nội'}>Khoa Nội</MenuItem>
                          <MenuItem value={'Khoa Ngoại'}>Khoa Ngoại</MenuItem>
                          <MenuItem value={'Khoa Nhi'}>Khoa Nhi</MenuItem>
                        </Select>
                      </FormControl>
                      <TextField disabled={isview} value={price} name='price' onChange={onChange} variant="outlined" label="Giá khám"></TextField>
                      {!isview && <TextField disabled={isview} label='Ngày khám' type='date' fullWidth name='date' value={date} InputLabelProps={{ shrink: true, }} onChange={onChangeDate} />}
                      {!isview && <TextField disabled={isview} error={clinic === '' || clinic.length > 10} helperText="Phòng khám không được quá 10 ký tự" value={clinic} onChange={(e) => { clinicchange(e.target.value) }} variant="outlined" label="Phòng khám"></TextField>}
                      {!isview &&
                        <div className='bt_add'>
                          <Button disabled={isview} variant="contained" onClick={addSchedule} className='color_btn_add'>Thêm</Button>
                        </div>}
                      <p>Lịch khám : {schedule}</p>
                      {schedules && schedules.map((scheduleItem, index) => (
                        <Typography >
                          {index + 1}. {new Date(scheduleItem.date).toLocaleDateString('vi-VN')}
                        </Typography>
                      ))}
                      {!isview && (<Button variant="contained" type="submit">Lưu</Button>)}
                    </Stack>
                  </form>
                </DialogContent>
              </Dialog>
              <ToastContainer />
            </Fragment>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default DoctorAdmin
