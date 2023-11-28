import axios from "axios";
import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  GET_ALL_TICKET_REQUEST,
  GET_ALL_TICKET_SUCCESS,
  GET_ALL_TICKET_FAIL,
  CLEAR_ERRORS,
} from "../constants/ticketConstant";

// Create new ticket
export const newTicket = (doctor, record, category, area, date, time) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TICKET_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(`/api/medpro/ticket/book/${doctor}/${record}/${time}`, { category, area, date }, config);

    dispatch({
      type: CREATE_TICKET_SUCCESS,
      payload: {
        success: data.success,
        ticket: data.ticket,
      }
    }
    );
  } catch (error) {
    dispatch({
      type: CREATE_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
}

// Get all tickets
export const getTickets = (keyword = '', currentPage = 0) => async (dispatch) => {
  try {
    currentPage = currentPage + 1;
    dispatch({ type: GET_ALL_TICKET_REQUEST });

    let link = `/api/medpro/tickets?keyword=${keyword}&page=${currentPage}`;

    const { data } = await axios.get(link);

    dispatch({
      type: GET_ALL_TICKET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_TICKET_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};