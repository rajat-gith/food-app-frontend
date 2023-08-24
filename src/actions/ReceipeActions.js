import axios from "axios";
import {
  RECEIPE_LIST_BY_ID_FAIL,
  RECEIPE_LIST_BY_ID_REQUEST,
  RECEIPE_LIST_BY_ID_SUCCESS,
  RECEIPE_LIST_FAIL,
  RECEIPE_LIST_REQUEST,
  RECEIPE_LIST_SUCCESS,
} from "../constants/ReceipeConstants";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
export const receipeList = (searchQuery) => async (dispatch) => {
  try {
    dispatch({
      type: RECEIPE_LIST_REQUEST,
    });

    const { data } = await axios.get(
      `${BASE_URL}/api/receipes/?name=${searchQuery}`
    );
    dispatch({
      type: RECEIPE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const receipeListById = (id) => async (dispatch) => {
  try {
    dispatch({
      type: RECEIPE_LIST_BY_ID_REQUEST,
    });

    const { data } = await axios.get(`${BASE_URL}/api/receipes/${id}`);

    dispatch({
      type: RECEIPE_LIST_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPE_LIST_BY_ID_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
