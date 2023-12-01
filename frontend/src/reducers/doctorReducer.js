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
// admin create doctor
export const adminCreateDoctorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_CREATE_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_CREATE_DOCTOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        doctor: action.payload.doctor
      }
    case ADMIN_CREATE_DOCTOR_FAIL:
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
// admin edit doctor
export const adminEditDoctorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_EDIT_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_EDIT_DOCTOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        doctor: action.payload.result
      }
    case ADMIN_EDIT_DOCTOR_FAIL:
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
// admin delete doctor
export const adminDeleteDoctorReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_DOCTOR_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_DELETE_DOCTOR_SUCCESS:
      return {
        loading: false,
        success: action.payload.success
      }
    case ADMIN_DELETE_DOCTOR_FAIL:
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