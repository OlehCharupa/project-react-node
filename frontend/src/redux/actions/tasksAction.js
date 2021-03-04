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
  CHANGE_ERROR,
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

const changeError = createAction(CHANGE_ERROR);

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
  changeError,
};
