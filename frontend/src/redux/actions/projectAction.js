import { createAction } from "@reduxjs/toolkit";

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

const addProjectRequest = createAction(ADD_PROJECT_REQUEST);
const addProjectSuccess = createAction(ADD_PROJECT_SUCCESS);
const addProjectError = createAction(ADD_PROJECT_ERROR);

const fetchProjectsRequest = createAction(FETCH_PROJECTS_REQUEST);
const fetchProjectsSuccess = createAction(FETCH_PROJECTS_SUCCESS);
const fetchProjectsError = createAction(FETCH_PROJECTS_ERROR);

const deleteProjectRequest = createAction(DELETE_PROJECT_REQUEST);
const deleteProjectSuccess = createAction(DELETE_PROJECT_SUCCESS);
const deleteProjectError = createAction(DELETE_PROJECT_ERROR);

const addMemberRequest = createAction(ADD_MEMBER_REQUEST)
const addMemberSuccess = createAction(ADD_MEMBER_SUCCESS)
const addMemberError = createAction(ADD_MEMBER_ERROR)

const changeError = createAction(CHANGE_ERROR);

export default {
  addProjectRequest,
  addProjectSuccess,
  addProjectError,
  fetchProjectsRequest,
  fetchProjectsSuccess,
  fetchProjectsError,
  deleteProjectRequest,
  deleteProjectSuccess,
  deleteProjectError,
  addMemberRequest,
  addMemberSuccess,
  addMemberError,
  changeError,
};
