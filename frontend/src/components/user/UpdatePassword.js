import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, IconButton, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { passwordRegex } from '../../utils/Regex';

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'

import { updatePassword, clearErrors } from '../../actions/userAction'

const UpdatePassword = () => {
  document.body.style.backgroundColor = '#ccc';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);

  const [user, setUser] = useState({
    oldPassword: '',
    password: '',
    confirmPassword: '',
  })

  const { oldPassword, password, confirmPassword } = user;

  const { message, error, loading } = useSelector(state => state.updatePassword);

  const [showoldPassword, setShowoldPassword] = useState(false);
  const [oldpasswordEntered, setoldPasswordEntered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [confirmPasswordEntered, setconfirmPasswordEntered] = useState(false);


  const handleClickShowoldPassword = () => {
    setShowoldPassword(!showoldPassword);
  };
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const handlePasswordChange = (event) => {
    if (event.target.name === 'oldPassword') {
      setoldPasswordEntered(event.target.value !== '');
      setUser({ ...user, oldPassword: event.target.value })
    }
    if (event.target.name === 'password') {
      setPasswordEntered(event.target.value !== '');
      setUser({ ...user, password: event.target.value })
    }
    if (event.target.name === 'confirmPassword') {
      setconfirmPasswordEntered(event.target.value !== '');
      setUser({ ...user, confirmPassword: event.target.value })
    }
  };

  useEffect(() => {
    if (password === '') {
      setPasswordError(false);
    }
    if (confirmPassword === '') {
      setconfirmPasswordError(false);
    }
    if (message && message.success === true) {
      toast.success("Cập nhật mật khẩu thành công", {
        position: toast.POSITION.TOP_RIGHT,
      });
      navigate('/', { replace: true });
      dispatch(clearErrors());
      return;
    }
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
    }


  }, [dispatch, oldPassword, password, confirmPassword, toast, message, error])

  const submitHandler = (e) => {
    e.preventDefault();
    if (oldPassword === '' || password === '' || confirmPassword === '') {
      toast.error('Vui lòng nhập đầy đủ thông tin', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (!passwordRegex.test(password)) {
      setPasswordError(true);
      return;
    } else {
      setPasswordError(false);
    }
    if (password !== confirmPassword) {
      setconfirmPasswordError(true);
      return;
    } else {
      setconfirmPasswordError(false);
    }
    dispatch(updatePassword(oldPassword, password))
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Cập nhật mật khẩu'} />
          <Grid className='mt-5'>
            <form onSubmit={submitHandler}>
              <Paper elevation={15} className='paper'>
                <Grid align='center'>
                  <Avatar className='avatar'><AccountCircle /></Avatar>
                  <p className='text_login'>CẬP NHẬT MẬT KHẨU</p>
                  <p className='required'>* Bắt buộc</p>
                </Grid>
                <TextField
                  label='Mật khẩu cũ'
                  placeholder='Nhập mật khẩu cũ'
                  type={showoldPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  name='oldPassword'
                  value={oldPassword}
                  onChange={handlePasswordChange}
                  InputProps={oldpasswordEntered ? {
                    endAdornment: (
                      <IconButton onClick={handleClickShowoldPassword}>
                        {showoldPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  } : {}}
                  className='mb-3'
                />
                <TextField
                  label='Mật khẩu mới'
                  placeholder='Nhập mật khẩu mới'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  name='password'
                  value={password}
                  onChange={handlePasswordChange}
                  InputProps={passwordEntered ? {
                    endAdornment: (
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  } : {}}
                  className='mb-3'
                  error={passwordError}
                  helperText={passwordError ? 'Mật khẩu phải có ít nhất 8 ký tự bao gồm chữ số chữ hoa chữ thường và ký tự đặc biệt' : ''}
                />
                <TextField
                  label='Nhập lại mật khẩu mới'
                  placeholder='Nhập lại mật khẩu mới'
                  type={showconfirmPassword ? 'text' : 'password'}
                  fullWidth
                  required
                  name='confirmPassword'
                  value={confirmPassword}
                  onChange={handlePasswordChange}
                  InputProps={confirmPasswordEntered ? {
                    endAdornment: (
                      <IconButton onClick={handleClickShowconfirmPassword}>
                        {showconfirmPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    ),
                  } : {}}
                  className='mb-3'
                  error={confirmPasswordError}
                  helperText={confirmPasswordError ? 'Mật khẩu không khớp' : ''}
                />
                <Button type='submit' id='login_btn' onClick={submitHandler} fullWidth>Đặt lại</Button>

                <Typography className='typographyColor mt-2'> Quay trở lại?{" "}
                  <Link to="/">
                    Trang chủ
                  </Link>
                </Typography>
              </Paper>
            </form>
          </Grid>
          <ToastContainer />
        </Fragment>
      )}
    </Fragment>
  )
}

export default UpdatePassword
