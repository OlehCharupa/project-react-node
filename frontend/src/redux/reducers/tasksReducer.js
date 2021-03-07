import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  ADD_TASK_ERROR,
  ADD_TASK_REQUEST,
  ADD_TASK_SUCCESS,
  FETCH_TASKS_ERROR,
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_REQUEST,
  CHANGE_ERROR,
} from "../constants/tasksConstants.js";

const items = createReducer([], {
  [FETCH_TASKS_SUCCESS]: (state, { payload }) => payload,
  [ADD_TASK_SUCCESS]: (state, { payload }) => [...state, payload],
  [DELETE_TASK_SUCCESS]: (state, { payload }) =>
    state.filter((task) => task.id !== payload),
  [UPDATE_TASK_SUCCESS]: (state, { payload }) => [
    ...state.filter((task) => task.id !== payload.id),
    ...payload,
  ],
});

const error = createReducer("", {
  [CHANGE_ERROR]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [ADD_TASK_REQUEST]: () => true,
  [ADD_TASK_SUCCESS]: () => false,
  [ADD_TASK_ERROR]: () => false,
  [FETCH_TASKS_REQUEST]: () => true,
  [FETCH_TASKS_SUCCESS]: () => false,
  [FETCH_TASKS_ERROR]: () => false,
  [DELETE_TASK_REQUEST]: () => true,
  [DELETE_TASK_SUCCESS]: () => false,
  [DELETE_TASK_ERROR]: () => false,
  [UPDATE_TASK_REQUEST]: () => true,
  [UPDATE_TASK_SUCCESS]: () => false,
  [UPDATE_TASK_ERROR]: () => false,
});

export default combineReducers({
  items,
  loading,
  error,
});
