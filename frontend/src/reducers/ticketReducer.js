import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAIL,
  GET_ALL_TICKET_REQUEST,
  GET_ALL_TICKET_SUCCESS,
  GET_ALL_TICKET_FAIL,
  ADMIN_GET_ALL_TICKET_REQUEST,
  ADMIN_GET_ALL_TICKET_SUCCESS,
  ADMIN_GET_ALL_TICKET_FAIL,
  ADMIN_STATISTICS_TICKET_REQUEST,
  ADMIN_STATISTICS_TICKET_SUCCESS,
  ADMIN_STATISTICS_TICKET_FAIL,
  ADMIN_UPDATE_STATUS_TICKET_REQUEST,
  ADMIN_UPDATE_STATUS_TICKET_SUCCESS,
  ADMIN_UPDATE_STATUS_TICKET_FAIL,
  ADMIN_DELETE_TICKET_REQUEST,
  ADMIN_DELETE_TICKET_SUCCESS,
  ADMIN_DELETE_TICKET_FAIL,
  CLEAR_ERRORS
} from '../constants/ticketConstant'

export const ticketReducer = (state = { ticket: {} }, action) => {
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
export const ticketsReducer = (state = { tickets: [] }, action) => {
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
        ticketCount: action.payload.ticketCount,
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
// admin ticket reducer
export const adminTicketsReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_TICKET_REQUEST:
      return {
        loading: true,
        tickets: []
      }
    case ADMIN_GET_ALL_TICKET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        tickets: action.payload.tickets,
        ticketCount: action.payload.ticketsCount,
        resPerPage: action.payload.resPerPage,
        filteredTicketsCount: action.payload.filteredTicketsCount,
        totalAmount: action.payload.totalAmount
      }
    case ADMIN_GET_ALL_TICKET_FAIL:
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
// admin statistics ticket reducer
export const adminStatisticsTicketsReducer = (state = { xAxis: [], data: [] }, action) => {
  switch (action.type) {
    case ADMIN_STATISTICS_TICKET_REQUEST:
      return {
        loading: true,
        xAxis: [],
        data: []
      }
    case ADMIN_STATISTICS_TICKET_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        xAxis: action.payload.xAxis,
        data: action.payload.data
      }
    case ADMIN_STATISTICS_TICKET_FAIL:
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
// admin update status ticket reducer
export const adminUpdateStatusTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_STATUS_TICKET_REQUEST:
      return {
        loading: true
      }
    case ADMIN_UPDATE_STATUS_TICKET_SUCCESS:
      return {
        loading: false,
        success: action.payload
      }
    case ADMIN_UPDATE_STATUS_TICKET_FAIL:
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
// admin delete ticket reducer
export const adminDeleteTicketReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_TICKET_REQUEST:
      return {
        loading: true
      }
    case ADMIN_DELETE_TICKET_SUCCESS:
      return {
        loading: false,
        successDelete: action.payload
      }
    case ADMIN_DELETE_TICKET_FAIL:
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