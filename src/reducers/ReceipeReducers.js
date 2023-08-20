import {
  RECEIPE_LIST_BY_ID_FAIL,
  RECEIPE_LIST_BY_ID_REQUEST,
  RECEIPE_LIST_BY_ID_SUCCESS,
  RECEIPE_LIST_FAIL,
  RECEIPE_LIST_REQUEST,
  RECEIPE_LIST_SUCCESS,
} from "../constants/ReceipeConstants";

export const receipeListReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIPE_LIST_REQUEST:
      return { loading: true };

    case RECEIPE_LIST_SUCCESS:
      return { loading: false, receipesList: action.payload };

    case RECEIPE_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const receipeListByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIPE_LIST_BY_ID_REQUEST:
      return { loading: true };

    case RECEIPE_LIST_BY_ID_SUCCESS:
      return { loading: false, receipeById: action.payload };

    case RECEIPE_LIST_BY_ID_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
