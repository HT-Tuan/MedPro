import{
  RECORD_LIST_REQUEST,
  RECORD_LIST_SUCCESS,
  RECORD_LIST_FAIL,
  CLEAR_ERRORS
}from '../constants/recordContant'

export const recordReducer = (state = { records: [] }, action) => {
  switch (action.type) {
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