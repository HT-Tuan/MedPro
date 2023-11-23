import axios from 'axios';

import {
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ALL_DOCTOR_FAIL,
  CLEAR_ERRORS
} from '../constants/doctorConstant';

// Get all doctors
export const getDoctors = (keyword = '', currentPage = 0) => async (dispatch) => {
  try {
    dispatch({ type: ALL_DOCTOR_REQUEST });
    currentPage += 1;

    const { data } = await axios.get(`/api/medpro/doctors?keyword=${keyword}&page=${currentPage}`);

    dispatch({
      type: ALL_DOCTOR_SUCCESS,
      payload: data
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

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS
  })
}