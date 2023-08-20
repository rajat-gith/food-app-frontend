import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginUserReducer,
  registerUserReducer,
  userReceipeReducers,
} from "./reducers/UserReducers";

const reducer = combineReducers({
  userLogin: loginUserReducer,
  userRegister: registerUserReducer,
  userReceipe: userReceipeReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userReceipe: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
