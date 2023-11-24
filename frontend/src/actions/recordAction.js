import axios from "axios";

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

// Create new record
export const newRecord = (fullname, birthday, gender, identificationcard, healthinsurance, phone, address) => async (dispatch) => {
  try {
    dispatch({ type: NEW_RECORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.post(
      `/api/medpro/record/new`,
      { fullname, birthday, gender, identificationcard, healthinsurance, phone, address },
      config
    );
  } catch (error) {
    dispatch({
      type: NEW_RECORD_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      },
    });
  }
};
// Update record
export const updateRecord = (id, fullname, birthday, gender, identificationcard, healthinsurance, phone, address) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_RECORD_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.put(
      `/api/medpro/record/${id}`,
      { fullname, birthday, gender, identificationcard, healthinsurance, phone, address },
      config
    );
  } catch (error) {
    dispatch({
      type: UPDATE_RECORD_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
      },
    });
    
  }
};
// Delete record
export const deleteRecord = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_RECORD_REQUEST });
    const response = await axios.delete(`/api/medpro/record/${id}`);
  } catch (error) {
    dispatch({
      type: DELETE_RECORD_FAIL,
      payload: {
        message: error.response.data.message,
        status: error.response.status
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