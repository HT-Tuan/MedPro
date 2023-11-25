import axios from 'axios';

import {
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ALL_DOCTOR_FAIL,
  GET_SECHUDLE_REQUEST,
  GET_SECHUDLE_SUCCESS,
  GET_SECHUDLE_FAIL,
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

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}