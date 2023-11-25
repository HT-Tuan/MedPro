import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  CLEAR_ERRORS
} from '../constants/ticketConstant'

export const ticketReducer = (state = {ticket: {}}, action) => {
  switch (action.type) {
    case CREATE_TICKET_REQUEST:
      return {
        loading: true,
        ticket: null
      }
    case CREATE_TICKET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        ticket: action.payload.ticket
      }
    case CREATE_TICKET_FAIL:
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
      return state
  }
}