import axios from "axios";
import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
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

    const { data } = await axios.post(`/api/medpro/doctor/book/${doctor}/${record}/${time}`, { category, area, date }, config);

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

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};