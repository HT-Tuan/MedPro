import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, IconButton, Button, Typography } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { emailRegex, passwordRegex } from '../../utils/Regex';

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'

import { forgotPassword, clearErrors } from '../../actions/userAction'
import VerifyCode from './VerifyCode';
const ForgotPassword = () => {
  document.body.style.backgroundColor = '#ccc';
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setconfirmPasswordError] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const { email, password, confirmPassword } = user;

  const { message, error, loading } = useSelector(state => state.forgotPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [showconfirmPassword, setShowconfirmPassword] = useState(false);
  const [confirmPasswordEntered, setconfirmPasswordEntered] = useState(false);


  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowconfirmPassword = () => {
    setShowconfirmPassword(!showconfirmPassword);
  };

  const handlePasswordChange = (event) => {
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
    if (email === '') {
      setEmailError(false);
    }
    if (password === '') {
      setPasswordError(false);
    }
    if (confirmPassword === '') {
      setconfirmPasswordError(false);
    }
    if (message && message.status === 200) {
      setShowVerifyCode(true);
      console.log(message);
    }

    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
    }


  }, [dispatch, password, confirmPassword, email, toast, message, error])

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === '' || password === '' || confirmPassword === '') {
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
    dispatch(forgotPassword(email))
  }

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
    if (e.target.name === 'email') {
      if (!emailRegex.test(email)) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }
  }

  return (
    <Fragment>
      {showVerifyCode && <VerifyCode email={email} password={password} confirmPassword={confirmPassword} />}
      {!showVerifyCode && <Fragment> {loading ? <Loader /> : (

        <Fragment>
          <MetaData title={'Đặt lại mật khẩu'} />

          <Grid className='mt-5'>
            <form onSubmit={submitHandler}>
              <Paper elevation={15} className='paper'>
                <Grid align='center'>
                  <Avatar className='avatar'><AccountCircle /></Avatar>
                  <p className='text_login'>ĐẶT LẠI MẬT KHẨU</p>
                  <p className='required'>* Bắt buộc</p>
                </Grid>
                <TextField
                  type="email"
                  label='Email'
                  placeholder='Nhập địa chỉ email'
                  fullWidth
                  required
                  name='email'
                  value={email}
                  className='mb-3'
                  onChange={onChange}
                  error={emailError}
                  helperText={emailError ? 'Email không hợp lệ' : ''}
                />
                <TextField
                  label='Mật khẩu'
                  placeholder='Nhập mật khẩu'
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
                  label='Nhập lại mật khẩu'
                  placeholder='Nhập mật khẩu'
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

                <Typography className='typographyColor mt-2'> Quay trở lại trang?{" "}
                  <Link to="/login">
                    Đăng nhập
                  </Link>
                </Typography>
              </Paper>
            </form>
          </Grid>
          <ToastContainer />
        </Fragment>
      )}
      </Fragment>}
    </Fragment>
  )
}

export default ForgotPassword
