import {
  USER_ADD_RECEIPE_FAIL,
  USER_ADD_RECEIPE_REQUEST,
  USER_ADD_RECEIPE_SUCCESS,
  USER_EDIT_RECEIPE_FAIL,
  USER_EDIT_RECEIPE_REQUEST,
  USER_EDIT_RECEIPE_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_RECEIPE_FAIL,
  USER_RECEIPE_REQUEST,
  USER_RECEIPE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/UserConstants";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/login`,
      { email: email, password: password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${BASE_URL}/api/register`,
      {
        name: name,
        email: email,
        password: password,
      },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userReceipe = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: USER_RECEIPE_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/receipes/user/${userId}/recipes`
    );

    dispatch({
      type: USER_RECEIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_RECEIPE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userAddReceipe = (post) => async (dispatch, getState) => {
  try {
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    dispatch({
      type: USER_ADD_RECEIPE_REQUEST,
    });
    console.log(post);

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userInfo.user.token}`,
      },
    };

    console.log(config);

    const { data } = await axios.post(
      `${REACT_APP_API_BASE_URL}/api/receipes/add`,
      post,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userInfo.user.token}`,
        },
      }
    );

    dispatch({
      type: USER_ADD_RECEIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_ADD_RECEIPE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const userEditReceipe = (post, id) => async (dispatch, getState) => {
  try {
    const REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    dispatch({
      type: USER_EDIT_RECEIPE_REQUEST,
    });
    console.log(post);

    const {
      userLogin: { userInfo },
    } = getState();

    const { data } = await axios.put(
      `${REACT_APP_API_BASE_URL}/api/receipes/${id}/update`,
      post,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.user.token}`,
        },
      }
    );

    dispatch({
      type: USER_EDIT_RECEIPE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_EDIT_RECEIPE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
