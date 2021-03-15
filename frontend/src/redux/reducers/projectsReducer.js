import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  ADD_PROJECT_ERROR,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  FETCH_PROJECTS_ERROR,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  ADD_MEMBER_REQUEST,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_ERROR,
  CHANGE_ERROR,
} from "../constants/projectsConstans.js";

const items = createReducer([], {
  [FETCH_PROJECTS_SUCCESS]: (state, { payload }) => payload,
  [ADD_PROJECT_SUCCESS]: (state, { payload }) => [...state, payload],
  [ADD_MEMBER_SUCCESS]: (state, {payload}) => [...state, payload],
  [DELETE_PROJECT_SUCCESS]: (state, { payload }) =>
    state.filter((sprint) => sprint._id !== payload),
});

const error = createReducer("", {
  [CHANGE_ERROR]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [ADD_PROJECT_REQUEST]: () => true,
  [ADD_PROJECT_SUCCESS]: () => false,
  [ADD_PROJECT_ERROR]: () => false,
  [FETCH_PROJECTS_REQUEST]: () => true,
  [FETCH_PROJECTS_SUCCESS]: () => false,
  [FETCH_PROJECTS_ERROR]: () => false,
  [DELETE_PROJECT_REQUEST]: () => true,
  [DELETE_PROJECT_SUCCESS]: () => false,
  [DELETE_PROJECT_ERROR]: () => false,
  [ADD_MEMBER_REQUEST]: () => true,
  [ADD_MEMBER_SUCCESS]: () => false,
  [ADD_MEMBER_ERROR]: () => false,
});

export default combineReducers({
  items,
  loading,
  error,
});
