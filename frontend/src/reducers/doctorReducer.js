import {
  ALL_DOCTOR_REQUEST,
  ALL_DOCTOR_SUCCESS,
  ALL_DOCTOR_FAIL,
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