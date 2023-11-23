import axios from 'axios';

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstant';

// Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    // Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Make a post request to /api/medpro/login
    const { data } = await axios.post('/api/medpro/login', { email, password }, config);
    localStorage.setItem('user', JSON.stringify({
      fullname: data.user.fullname,
    }))
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: USER_LOGIN_FAIL, payload: error.response.data.message });
  }
};
// Register
export const register = (fullname, email, password, gender, birthday) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    // Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Make a post request to /api/medpro/register
    const { data } = await axios.post('/api/medpro/register', { fullname, email, password, gender, birthday }, config);
    localStorage.setItem('user', JSON.stringify({
      fullname: data.user.fullname,
    }))
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data.message });
  }
};

// Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });
    // Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Make a post request to /api/medpro/password/forgot
    const { data } = await axios.post('/api/medpro/password/forgot', { email }, config);
    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};