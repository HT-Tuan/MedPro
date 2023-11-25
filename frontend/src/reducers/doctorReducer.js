import {
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ALL_DOCTOR_FAIL,
  GET_SECHUDLE_REQUEST,
  GET_SECHUDLE_SUCCESS,
  GET_SECHUDLE_FAIL,
  CLEAR_ERRORS
} from '../constants/doctorConstant';

export const doctorReducer = (state = { doctors: [] }, action) => {
  switch (action.type) {
    case ALL_DOCTOR_REQUEST:
      return {
        loading: true,
        doctors: []
      }
    case ALL_DOCTOR_SUCCESS:
      return {
        loading: false,
        doctors: action.payload.doctors,
        doctorsCount: action.payload.doctorCount,
        resPerPage: action.payload.resPerPage,
        filteredDoctorsCount: action.payload.filteredDoctorsCount
      }
    case ALL_DOCTOR_FAIL:
      return {
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}

export const scheduledReducer = (state = { scheduled: [] }, action) => {
  switch (action.type) {
    case GET_SECHUDLE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case GET_SECHUDLE_SUCCESS:
      return {
        loading: false,
        scheduled: action.payload
      }
    case GET_SECHUDLE_FAIL:
      return {
        ...state,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      }

    default:
      return state;
  }
}