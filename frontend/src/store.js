import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { authReducer } from './reducers/userReducer';
import { doctorReducer } from './reducers/doctorReducer';
const reducer = combineReducers({
  // reducers
  auth: authReducer,
  doctor: doctorReducer
});

const middleware = [thunk];

const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store;