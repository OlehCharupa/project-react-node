import axios from "axios";
import projectsAction from "../actions/projectAction.js";

// TODO убрать после готового бека
const projects = [
  {
    id: 1,
    name: "Project 1",
    description: "Текст описание проекта",
  },
  {
    id: 2,
    name: "Project 2",
    description: "Текст описание проекта",
  },
  {
    id: 3,
    name: "Project 3",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
  {
    id: 4,
    name: "Project 4",
    description: "Текст описание проекта",
  },
];

const addProject = (name, description) => (dispatch) => {
  dispatch(projectsAction.addProjectRequest());

  //TODO написать логику для запроса, название полей не менять)

  axios
    .post("projects", { name })
    .then(({ data }) => dispatch(projectsAction.addProjectSuccess(data)))
    .catch((error) => dispatch(projectsAction.addProjectError(error)));
};

const fetchProjects = () => (dispatch) => {
  dispatch(projectsAction.fetchProjectsRequest());
  // TODO убрать после готового бека
  dispatch(projectsAction.fetchProjectsSuccess(projects));

  // TODO расскоментить после готового бека
  // axios
  //   .get("projects")
  //   .then(({ data }) => dispatch(projectsAction.fetchProjectsSuccess(data)))
  //   .catch((error) => dispatch(projectsAction.fetchProjectsError(error)));
};

const deleteProject = (id) => (dispatch) => {
  dispatch(projectsAction.deleteProjectRequest());

  axios
    .delete(`projects/${id}`)
    .then(() => dispatch(projectsAction.deleteProjectSuccess(id)))
    .catch((error) => dispatch(projectsAction.deleteProjectError(error)));
};

export default {
  addProject,
  fetchProjects,
  deleteProject,
};
