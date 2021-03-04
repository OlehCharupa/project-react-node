import { createAction } from "@reduxjs/toolkit";

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
  CHANGE_ERROR,
} from "../constants/sprintsConstants.js";

const addSprintRequest = createAction(ADD_SPRINT_REQUEST);
const addSprintSuccess = createAction(ADD_SPRINT_SUCCESS);
const addSprintError = createAction(ADD_SPRINT_ERROR);

const fetchSprintsRequest = createAction(FETCH_SPRINTS_REQUEST);
const fetchSprintsSuccess = createAction(FETCH_SPRINTS_SUCCESS);
const fetchSprintsError = createAction(FETCH_SPRINTS_ERROR);

const deleteSprintRequest = createAction(DELETE_SPRINT_REQUEST);
const deleteSprintSuccess = createAction(DELETE_SPRINT_SUCCESS);
const deleteSprintError = createAction(DELETE_SPRINT_ERROR);

const changeError = createAction(CHANGE_ERROR);

export default {
  addSprintRequest,
  addSprintSuccess,
  addSprintError,
  fetchSprintsRequest,
  fetchSprintsSuccess,
  fetchSprintsError,
  deleteSprintRequest,
  deleteSprintSuccess,
  deleteSprintError,
  changeError,
};
