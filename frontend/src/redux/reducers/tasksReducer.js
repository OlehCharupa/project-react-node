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
  CHANGE_TASK_FILTER,
  CHANGE_ERROR,
  CHANGE_CURRENT_DAY_INDEX,
} from "../constants/tasksConstants.js";

const items = createReducer([], {
  [FETCH_TASKS_SUCCESS]: (state, { payload }) => payload,
  [ADD_TASK_SUCCESS]: (state, { payload }) => [...state, payload],
  [DELETE_TASK_SUCCESS]: (state, { payload }) =>
    state.filter((task) => task._id !== payload),
  [UPDATE_TASK_SUCCESS]: (state, { payload }) => {
    const item = state.find((sprint) => sprint._id === payload.id);
    const tasks = [...item.hoursWastedPerDay];
    tasks.splice(payload.index, 1, {
      currentDay: payload.day.currentDay,
      singleHoursWasted: payload.day.singleHoursWasted,
    });
    return [
      ...state.filter((sprint) => sprint._id !== payload.id),
      {
        ...item,
        hoursWasted: payload.newWastedHours,
        hoursWastedPerDay: tasks,
      },
    ];
  },
});

const filter = createReducer("", {
  [CHANGE_TASK_FILTER]: (state, { payload }) => payload,
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

const dayIndex = createReducer(0, {
  [CHANGE_CURRENT_DAY_INDEX]: (state, { payload }) => payload,
});

export default combineReducers({
  items,
  filter,
  loading,
  error,
  dayIndex,
});
