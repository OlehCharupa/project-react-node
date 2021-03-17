import { combineReducers } from "redux";
import { createReducer } from "@reduxjs/toolkit";

import {
  ADD_SPRINT_ERROR,
  ADD_SPRINT_REQUEST,
  ADD_SPRINT_SUCCESS,
  FETCH_SPRINTS_ERROR,
  FETCH_SPRINTS_REQUEST,
  FETCH_SPRINTS_SUCCESS,
  DELETE_SPRINT_ERROR,
  DELETE_SPRINT_REQUEST,
  DELETE_SPRINT_SUCCESS,
  UPDATE_SPRINT_ERROR,
  UPDATE_SPRINT_SUCCESS,
  UPDATE_SPRINT_REQUEST,
  CHANGE_ERROR,
} from "../constants/sprintsConstants.js";

const items = createReducer([], {
  [FETCH_SPRINTS_SUCCESS]: (state, { payload }) => payload,
  [ADD_SPRINT_SUCCESS]: (state, { payload }) => [...state, payload],
  [DELETE_SPRINT_SUCCESS]: (state, { payload }) =>
    state.filter((sprint) => sprint._id !== payload),
  [UPDATE_SPRINT_SUCCESS]: (state, { payload }) => {
    console.dir(payload);
    return [
      ...state.filter((sprint) => sprint._id !== payload.id),
      {
        ...state.find((sprint) => sprint._id === payload.id),
        title: payload.newTitle,
      },
    ];
  },
});

const error = createReducer("", {
  [CHANGE_ERROR]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [ADD_SPRINT_REQUEST]: () => true,
  [ADD_SPRINT_SUCCESS]: () => false,
  [ADD_SPRINT_ERROR]: () => false,
  [FETCH_SPRINTS_REQUEST]: () => true,
  [FETCH_SPRINTS_SUCCESS]: () => false,
  [FETCH_SPRINTS_ERROR]: () => false,
  [DELETE_SPRINT_REQUEST]: () => true,
  [DELETE_SPRINT_SUCCESS]: () => false,
  [DELETE_SPRINT_ERROR]: () => false,
  [UPDATE_SPRINT_REQUEST]: () => true,
  [UPDATE_SPRINT_SUCCESS]: () => false,
  [UPDATE_SPRINT_ERROR]: () => false,
});

export default combineReducers({
  items,
  loading,
  error,
});
