import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginUserReducer,
  registerUserReducer,
  userReceipeReducers,
} from "./reducers/UserReducers";
import {
  receipeListByIdReducer,
  receipeListReducer,
} from "./reducers/ReceipeReducers";
import { receipeListById } from "./actions/ReceipeActions";

const reducer = combineReducers({
  userLogin: loginUserReducer,
  userRegister: registerUserReducer,
  userReceipe: userReceipeReducers,
  receipesList: receipeListReducer,
  receipe: receipeListByIdReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userReceipe: {},
  receipesList: {},
  receipe: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
