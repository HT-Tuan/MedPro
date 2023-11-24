import {
  RECORD_LIST_REQUEST,
  RECORD_LIST_SUCCESS,
  RECORD_LIST_FAIL,
  NEW_RECORD_REQUEST,
  NEW_RECORD_FAIL,
  UPDATE_RECORD_REQUEST,
  UPDATE_RECORD_FAIL,
  DELETE_RECORD_REQUEST,
  DELETE_RECORD_FAIL,
  CLEAR_ERRORS
} from '../constants/recordContant'

export const recordReducer = (state = { records: [] }, action) => {
  switch (action.type) {
    case DELETE_RECORD_REQUEST:
    case UPDATE_RECORD_REQUEST:
    case NEW_RECORD_REQUEST:
      return {
        ...state,
        loading: true
      }
    case RECORD_LIST_REQUEST:
      return {
        loading: true,
        records: []
      }
    case RECORD_LIST_SUCCESS:
      return {
        loading: false,
        records: action.payload.records,
        recordsCount: action.payload.recordCount,
        resPerPage: action.payload.resPerPage,
        filteredRecordsCount: action.payload.filteredRecordsCount
      }
    case DELETE_RECORD_FAIL:
    case UPDATE_RECORD_FAIL:
    case NEW_RECORD_FAIL:
    case RECORD_LIST_FAIL:
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