import axios from 'axios';

import {
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ALL_DOCTOR_FAIL,
  GET_SECHUDLE_REQUEST,
  GET_SECHUDLE_SUCCESS,
  GET_SECHUDLE_FAIL,
  ADMIN_CREATE_DOCTOR_REQUEST,
  ADMIN_CREATE_DOCTOR_SUCCESS,
  ADMIN_CREATE_DOCTOR_FAIL,
  ADMIN_EDIT_DOCTOR_REQUEST,
  ADMIN_EDIT_DOCTOR_SUCCESS,
  ADMIN_EDIT_DOCTOR_FAIL,
  ADMIN_DELETE_DOCTOR_REQUEST,
  ADMIN_DELETE_DOCTOR_SUCCESS,
  ADMIN_DELETE_DOCTOR_FAIL,
  CLEAR_ERRORS
} from '../constants/doctorConstant';

// Get all doctors
export const getDoctors = (keyword = '', currentPage = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DOCTOR_REQUEST });
    currentPage += 1;

    const response = await axios.get(`/api/medpro/doctors?keyword=${keyword}&page=${currentPage}`);

    dispatch({
      type: ALL_DOCTOR_SUCCESS,
      payload: response.data
    })

  } catch (error) {
    dispatch({
      type: ALL_DOCTOR_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      }
    })
  }
}
// Get scheduled doctors
export const getScheduledDoctors = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SECHUDLE_REQUEST });

    const response = await axios.get(`/api/medpro/doctor/scheduled/${id}`);

    dispatch({
      type: GET_SECHUDLE_SUCCESS,
      payload: response.data.scheduled
    })

  } catch (error) {
    dispatch({
      type: GET_SECHUDLE_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      }
    })
  }
}
// Create a doctor
export const createDoctor = (doctorData) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_CREATE_DOCTOR_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const data = {
      fullname: doctorData.fullname,
      title: doctorData.titleDoctor,
      gender: doctorData.gender,
      specialist: doctorData.specialist,
      price: doctorData.price === '' ? 150 : doctorData.price,
      schedule: doctorData.schedules
    }
    const response = await axios.post(`/api/medpro/admin/doctor/new`, data, config);

    dispatch({
      type: ADMIN_CREATE_DOCTOR_SUCCESS,
      payload: response.data
    })

  } catch (error) {
    dispatch({
      type: ADMIN_CREATE_DOCTOR_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      }
    })
  }
}
// Edit a doctor
export const editDoctor = (id, doctorData) => async (dispatch) => {
  try {
    const data = {
      fullname: doctorData.fullname,
      title: doctorData.titleDoctor,
      gender: doctorData.gender,
      specialist: doctorData.specialist,
      price: doctorData.price === '' ? 150 : doctorData.price,
      schedule: doctorData.schedules
    }
    dispatch({ type: ADMIN_EDIT_DOCTOR_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    const response = await axios.put(`/api/medpro/admin/doctor/${id}`, data, config);
    dispatch({
      type: ADMIN_EDIT_DOCTOR_SUCCESS,
      payload: response.data
    })

  } catch (error) {
    dispatch({
      type: ADMIN_EDIT_DOCTOR_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      }
    })
  }
}
// Delete a doctor
export const deleteDoctor = (id) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_DELETE_DOCTOR_REQUEST });
    const response = await axios.delete(`/api/medpro/admin/doctor/${id}`);
    dispatch({
      type: ADMIN_DELETE_DOCTOR_SUCCESS,
      payload: response.data
    })

  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_DOCTOR_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      }
    })
  }
}
//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}