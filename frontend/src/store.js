import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer, forgotPasswordReducer, verifyCodeReducer, updatePasswordReducer } from './reducers/userReducer';
import { doctorReducer } from './reducers/doctorReducer';
import { recordReducer } from './reducers/recordReducer';
const reducer = combineReducers({
  // reducers
  auth: authReducer,
  forgotPassword: forgotPasswordReducer,
  verifyCode: verifyCodeReducer,
  updatePassword: updatePasswordReducer,
  //
  record: recordReducer,
  doctor: doctorReducer
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;