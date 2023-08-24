import {
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_RECEIPE_REQUEST,
  USER_RECEIPE_SUCCESS,
  USER_RECEIPE_FAIL,
  USER_ADD_RECEIPE_REQUEST,
  USER_ADD_RECEIPE_SUCCESS,
  USER_ADD_RECEIPE_FAIL,
  USER_EDIT_RECEIPE_REQUEST,
  USER_EDIT_RECEIPE_SUCCESS,
  USER_EDIT_RECEIPE_FAIL,
} from "../constants/UserConstants";

export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };

    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };

    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userReceipeReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_RECEIPE_REQUEST:
      return { loading: true };

    case USER_RECEIPE_SUCCESS:
      return { loading: false, userReceipeInfo: action.payload };

    case USER_RECEIPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userAddReceipeReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_ADD_RECEIPE_REQUEST:
      return { loading: true };

    case USER_ADD_RECEIPE_SUCCESS:
      return { loading: false, userAddReceipeInfo: action.payload };

    case USER_ADD_RECEIPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const userEditReceipeReducers = (state = {}, action) => {
  switch (action.type) {
    case USER_EDIT_RECEIPE_REQUEST:
      return { loading: true };

    case USER_EDIT_RECEIPE_SUCCESS:
      return { loading: false, userEditReceipeInfo: action.payload };

    case USER_EDIT_RECEIPE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
