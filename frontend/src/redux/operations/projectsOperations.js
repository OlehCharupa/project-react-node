import axios from "axios";
import projectsAction from "../actions/projectAction.js";

const addProject = ({ projectName, description }) => (dispatch) => {
  dispatch(projectsAction.addProjectRequest());

  axios
    .post("project", { title: projectName, description })
    .then(({ data }) =>
      dispatch(projectsAction.addProjectSuccess({ ...data, _id: data.id }))
    )
    .catch((error) => dispatch(projectsAction.addProjectError(error)));
};

const fetchProjects = () => (dispatch) => {
  dispatch(projectsAction.fetchProjectsRequest());

  axios
    .get("project")
    .then(({ data }) => dispatch(projectsAction.fetchProjectsSuccess(data)))
    .catch((error) => dispatch(projectsAction.fetchProjectsError(error)));
};

const deleteProject = (id) => (dispatch) => {
  dispatch(projectsAction.deleteProjectRequest());

  axios
    .delete(`project/${id}`)
    .then(() => dispatch(projectsAction.deleteProjectSuccess(id)))
    .catch((error) => dispatch(projectsAction.deleteProjectError(error)));
};

const addProjectMember = (id, value) => (dispatch) => {
  dispatch(projectsAction.addProjectRequest());

  axios
    .patch(`project/contributor/${id}`, value)
    .then(({ data }) => {
      dispatch(projectsAction.addMemberSuccess({ ...data, _id: data.id }));
    })
    .catch((error) => dispatch(projectsAction.addMemberError(error)));
};

const updateProject = (id, title) => (dispatch) => {
  dispatch(projectsAction.updateProjectRequest());

  axios
    .patch(`project/title/${id}`, { title })
    .then(({ data }) =>
      dispatch(projectsAction.updateProjectSuccess({ id, ...data }))
    )
    .catch((error) => dispatch(projectsAction.updateProjectError(error)));
};

export default {
  addProject,
  fetchProjects,
  deleteProject,
  addProjectMember,
  updateProject,
};
