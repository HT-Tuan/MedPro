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
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
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
    localStorage.setItem('user', JSON.stringify(data.user))
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
    localStorage.setItem('user', JSON.stringify(data.user))
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
    const response = await axios.post('/api/medpro/password/forgot', { email }, config);
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS, payload: {
        message: response.data.message,
        status: response.status
      }
    });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data.message });
  }
};

// Verify code
export const verifyCode = (password, confirmPassword, verifycode) => async (dispatch) => {
  try {
    dispatch({ type: VERIFY_CODE_REQUEST });
    // Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Make a post request to /api/medpro/password/reset
    const response = await axios.put('/api/medpro/password/reset', { password, confirmPassword, verifycode }, config);
    localStorage.setItem('user', JSON.stringify(response.data.user))
    dispatch({
      type: VERIFY_CODE_SUCCESS, payload:
      {
        status: response.status,
        user: response.data.user
      }
    });
  } catch (error) {
    dispatch({ type: VERIFY_CODE_FAIL, payload: error.response.data.message });
  }
};
// Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get('/api/medpro/logout');
    localStorage.setItem('user', null);
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
  }
};
// Update password
export const updatePassword = (oldPassword, password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    // Set headers
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // Make a put request to /api/medpro/password/update
    const response = await axios.put('/api/medpro/password/update', { oldPassword, password }, config);
    dispatch({
      type: UPDATE_PASSWORD_SUCCESS, payload: {
        success: response.data.success,
        user: response.data.user,
        status: response.status
      }
    });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data.message });
  }
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};