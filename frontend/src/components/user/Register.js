import React, { Fragment, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Grid, Paper, Avatar, TextField, IconButton, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { Visibility, VisibilityOff, AccountCircle } from '@mui/icons-material';
import { emailRegex, passwordRegex } from '../../utils/Regex';

import MetaData from '../layouts/MetaData'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch, useSelector } from 'react-redux'

import { register, clearErrors } from '../../actions/userAction'

const Register = () => {
  document.body.style.backgroundColor = '#ccc';
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [user, setUser] = useState({
    fullname: '',
    email: '',
    password: '',
    gender: '',
    birthday: ''
  })

  const { fullname, email, password, gender, birthday } = user;

  const { isAuthenticated, error } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordEntered, setPasswordEntered] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (event) => {
    setPasswordEntered(event.target.value !== '');
    setUser({ ...user, password: event.target.value })
  };

  useEffect(() => {
    if (email === '') {
      setEmailError(false);
    }
    if (password === '') {
      setPasswordError(false);
    }

    if (isAuthenticated) {
      navigate("/")
    }

    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
      dispatch(clearErrors());
    }


  }, [dispatch, password, email, toast, isAuthenticated, error, navigate])

  const submitHandler = (e) => {
    e.preventDefault();
    if (fullname === '' || email === '' || password === '' || gender === '' || birthday === '') {
      toast.error("Vui lòng nhập đầy đủ thông tin", {
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
    dispatch(register(fullname, email, password, gender, birthday))
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
      <MetaData title={'Đăng ký'} />

      <Grid className='mt-5'>
        <form onSubmit={submitHandler}>
          <Paper elevation={15} className='paper'>
            <Grid align='center'>
              <Avatar className='avatar'><AccountCircle /></Avatar>
              <p className='text_login'>ĐĂNG KÝ</p>
              <p className='required'>* Bắt buộc</p>

            </Grid>
            <TextField
              label='Họ và tên'
              placeholder='Nhập họ và tên'
              fullWidth
              required
              name='fullname'
              value={fullname}
              className='mb-3'
              onChange={onChange}
            />
            <FormControl
              fullWidth
              className='mb-3'
              required
            >
              <InputLabel>Giới tính</InputLabel>
              <Select
                label="Giới tính"
                name='gender'
                value={gender}
                onChange={onChange}
              >
                <MenuItem value={'Nam'}>Nam</MenuItem>
                <MenuItem value={'Nữ'}>Nữ</MenuItem>
                <MenuItem value={'Khác'}>Khác</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label='Ngày sinh'
              type='date'
              fullWidth
              required
              name='birthday'
              value={birthday}
              className='mb-3'
              InputLabelProps={{
                shrink: true,
              }}
              onChange={onChange}
            />
            <TextField
              type="email"
              label='Địa chỉ email'
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
            <Button type='submit' id='login_btn' onClick={submitHandler} fullWidth>Đăng ký</Button>

            <Typography className='typographyColor mt-2'> Bạn đã có tài khoản?{" "}
              <Link to="/login">
                Đăng nhập
              </Link>
            </Typography>
          </Paper>
        </form>
      </Grid>
      <ToastContainer />
    </Fragment>
  )
}

export default Register
