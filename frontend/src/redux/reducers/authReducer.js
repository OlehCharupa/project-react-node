import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authAction from "../actions/authAction";

const initialUserState = { email: null, id: null, projects: null };
const initialErrorState = {message: '', config: {data: "{}"}};
const user = createReducer(initialUserState, {
  [authAction.registerSuccess]: (_, { payload }) => payload.data,
  [authAction.loginSuccess]: (_, { payload }) => payload.data,
  [authAction.logoutSuccess]: () => initialUserState,
  [authAction.getCurrentUserSuccess]: (_, { payload }) => payload.data,
});

const token = createReducer(null, {
  [authAction.registerSuccess]: (_, { payload }) => payload.accessToken,
  [authAction.loginSuccess]: (_, { payload }) => payload.accessToken,
  [authAction.logoutSuccess]: () => null,
});

const error = createReducer(initialErrorState, {
  [authAction.registerError]: (_, { payload }) => payload,
  [authAction.loginError]: (_, { payload }) => payload,
  [authAction.logoutError]: (_, { payload }) => payload,
  [authAction.getCurrentUserError]: (_, { payload }) => payload,
});

export const authPersistConfig = {
  key: "auth",
  storage,
  whiteList: ["token"],
  blacklist: ["error"],
};

export default combineReducers({
  user,
  token,
  error,
});
