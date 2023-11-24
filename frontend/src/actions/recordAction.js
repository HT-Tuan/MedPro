import axios from "axios";

import {
  RECORD_LIST_REQUEST,
  RECORD_LIST_SUCCESS,
  RECORD_LIST_FAIL,
  CLEAR_ERRORS,
} from "../constants/recordContant";

// Get all records
export const getRecords = (keyword = "", currentPage = 0) => async (
  dispatch
) => {
  try {
    dispatch({ type: RECORD_LIST_REQUEST });
    currentPage += 1;

    const response = await axios.get(
      `/api/medpro/records?keyword=${keyword}&page=${currentPage}`
    );

    dispatch({
      type: RECORD_LIST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: RECORD_LIST_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status,
      },
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};