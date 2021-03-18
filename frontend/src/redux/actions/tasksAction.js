import { createAction } from "@reduxjs/toolkit";

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
  CHANGE_TASK_FILTER,
  UPDATE_TASK_REQUEST,
  UPDATE_TASK_SUCCESS,
  UPDATE_TASK_ERROR,
  CHANGE_ERROR,
  CHANGE_CURRENT_DAY_INDEX,
} from "../constants/tasksConstants";

const addTaskRequest = createAction(ADD_TASK_REQUEST);
const addTaskSuccess = createAction(ADD_TASK_SUCCESS);
const addTaskError = createAction(ADD_TASK_ERROR);

const fetchTasksRequest = createAction(FETCH_TASKS_REQUEST);
const fetchTasksSuccess = createAction(FETCH_TASKS_SUCCESS);
const fetchTasksError = createAction(FETCH_TASKS_ERROR);

const deleteTaskRequest = createAction(DELETE_TASK_REQUEST);
const deleteTaskSuccess = createAction(DELETE_TASK_SUCCESS);
const deleteTaskError = createAction(DELETE_TASK_ERROR);

const updateTaskRequest = createAction(UPDATE_TASK_REQUEST);
const updateTaskSuccess = createAction(UPDATE_TASK_SUCCESS);
const updateTaskError = createAction(UPDATE_TASK_ERROR);

const changeTaskFilter = createAction(CHANGE_TASK_FILTER);
const changeError = createAction(CHANGE_ERROR);
const changeCurrentDayIndex = createAction(CHANGE_CURRENT_DAY_INDEX);

export default {
  addTaskRequest,
  addTaskSuccess,
  addTaskError,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksError,
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskError,
  updateTaskRequest,
  updateTaskSuccess,
  updateTaskError,
  changeTaskFilter,
  changeError,
  changeCurrentDayIndex,
};
