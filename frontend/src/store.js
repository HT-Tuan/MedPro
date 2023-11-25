import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer, forgotPasswordReducer, verifyCodeReducer, updatePasswordReducer } from './reducers/userReducer';
import { doctorReducer, scheduledReducer } from './reducers/doctorReducer';
import { recordReducer } from './reducers/recordReducer';
import { ticketReducer } from './reducers/ticketReducer';
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
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;