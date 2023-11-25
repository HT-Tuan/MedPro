import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  GET_ALL_TICKET_REQUEST,
  GET_ALL_TICKET_SUCCESS,
  GET_ALL_TICKET_FAIL,
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
//
export const ticketsReducer = (state = {tickets: []}, action) => {
  switch (action.type) {
    case GET_ALL_TICKET_REQUEST:
      return {
        loading: true,
        tickets: []
      }
    case GET_ALL_TICKET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        tickets: action.payload.tickets,
        ticketCount:  action.payload.ticketCount,
        resPerPage: action.payload.resPerPage,
        filteredTicketsCount: action.payload.filteredTicketsCount
      }
    case GET_ALL_TICKET_FAIL:
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