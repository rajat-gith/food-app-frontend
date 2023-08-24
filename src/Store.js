import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  loginUserReducer,
  registerUserReducer,
  userEditReceipeReducers,
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
  receipeEdit: userEditReceipeReducers,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userReceipe: {},
  receipesList: {},
  userRegister: { userInfo: userInfoFromStorage },
  receipe: {},
  receipeEdit: {},
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
