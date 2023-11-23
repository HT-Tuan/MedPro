import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, IconButton, Button, Typography } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';

import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'

import { login, clearErrors } from '../../actions/userAction'
import { emailRegex } from '../../utils/Regex';

const Login = () => {
  document.body.style.backgroundColor = '#ccc';
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);


  const [showPassword, setShowPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);

  const handleEmailChange = (event) => {
    const { value } = event.target;
    setEmail(value);
    if (!emailRegex.test(email)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    setPasswordEntered(value !== '');
    setPassword(value);
  };

  let redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (email === '') {
      setEmailError(false);
    }
    if (isAuthenticated) {
      navigate(redirect)
    }

    if (error) {
      toast.error(error, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      dispatch(clearErrors());
    }

  }, [dispatch, email, toast, isAuthenticated, error, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <Fragment>
      {loading ? <Loader /> : (
        <Fragment>
          <MetaData title={'Đăng nhập'} />

          <Grid className='mt-5'>
            <form onSubmit={submitHandler}>
              <Paper elevation={15} className='paper'>
                <Grid align='center'>
                  <Avatar className='avatar'><AccountCircle /></Avatar>
                  <p className='text_login'>ĐĂNG NHẬP</p>
                </Grid>
                <TextField
                  type="email"
                  label='Email'
                  placeholder='Nhập địa chỉ email'
                  fullWidth
                  required
                  value={email}
                  className='mb-3'
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? 'Email không hợp lệ' : ''}
                />
                <TextField
                  label='Mật khẩu'
                  placeholder='Nhập mật khẩu'
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  required
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
                />
                <Button type='submit' id='login_btn' onClick={submitHandler} fullWidth className='mb-3'>Đăng nhập</Button>
                <Typography>
                  <Link to="/password/forgot">
                    Quên mật khẩu ?
                  </Link>
                </Typography>
                <Typography className='mb-3 typographyColor'> Bạn chưa có tài khoản?{" "}
                  <Link to="/register">
                    Đăng ký
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

export default Login
