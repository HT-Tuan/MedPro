import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  VERIFY_CODE_REQUEST,
  VERIFY_CODE_SUCCESS,
  VERIFY_CODE_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  ADMIN_GET_ALL_USERS_REQUEST,
  ADMIN_GET_ALL_USERS_SUCCESS,
  ADMIN_GET_ALL_USERS_FAIL,
  ADMIN_DELETE_USER_REQUEST,
  ADMIN_DELETE_USER_SUCCESS,
  ADMIN_DELETE_USER_FAIL,
  CLEAR_ERRORS
} from '../constants/userConstant'

// Login Reducer
export const authReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case USER_LOGIN_REQUEST:
      return {
        loading: true,
        isAuthenticated: false
      }

    case REGISTER_USER_SUCCESS:
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        isAuthenticated: true,
        user: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuthenticated: false,
        user: null
      }
    case REGISTER_USER_FAIL:
    case USER_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      }
    case LOGOUT_FAIL:
      return {
        ...state,
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

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case FORGOT_PASSWORD_FAIL:
      return {
        ...state,
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
// Verify Code Reducer
export const verifyCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case VERIFY_CODE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case VERIFY_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case VERIFY_CODE_FAIL:
      return {
        ...state,
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
// Update Password Reducer
export const updatePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      }
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload
      }
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        message: null
      }
    default:
      return state
  }
}

// admin user reducer
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_GET_ALL_USERS_REQUEST:
      return {
        loading: true,
        users: []
      }
    case ADMIN_GET_ALL_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload
      }
    case ADMIN_GET_ALL_USERS_FAIL:
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
// admin delete user reducer
export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case ADMIN_DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADMIN_DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        payload: action.payload
      }
    case ADMIN_DELETE_USER_FAIL:
      return {
        ...state,
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