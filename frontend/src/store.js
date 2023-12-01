import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer, forgotPasswordReducer, verifyCodeReducer, updatePasswordReducer, allUsersReducer, deleteUserReducer } from './reducers/userReducer';
import { doctorReducer, scheduledReducer, adminCreateDoctorReducer, adminEditDoctorReducer, adminDeleteDoctorReducer } from './reducers/doctorReducer';
import { recordReducer } from './reducers/recordReducer';
import { ticketReducer, ticketsReducer, adminTicketsReducer, adminStatisticsTicketsReducer, adminUpdateStatusTicketReducer, adminDeleteTicketReducer } from './reducers/ticketReducer';
const reducer = combineReducers({
  // reducers
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  verifyCode: verifyCodeReducer,
  updatePassword: updatePasswordReducer,
  //
  record: recordReducer,
  doctor: doctorReducer,
  scheduled: scheduledReducer,
  ticket: ticketReducer,
  tickets: ticketsReducer,
  // admin
  adminTickets: adminTicketsReducer,
  adminStatisticsTickets: adminStatisticsTicketsReducer,
  adminUpdateStatusTicket: adminUpdateStatusTicketReducer,
  adminDeleteTicket: adminDeleteTicketReducer,
  adminUsers: allUsersReducer,
  adminCreateDoctor: adminCreateDoctorReducer,
  adminEditDoctor: adminEditDoctorReducer,
  adminDeleteDoctor: adminDeleteDoctorReducer,
  admindeleteUser: deleteUserReducer
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;