/* eslint-disable import/no-anonymous-default-export */
import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FIRST_STEP,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FIRST_STEP_ERROR,
} from "../actions";

const initialState = {
  user: {},
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        message: action.payload,
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        message: action.payload,
      };

    case REGISTER_USER_FIRST_STEP:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_USER_FIRST_STEP_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
