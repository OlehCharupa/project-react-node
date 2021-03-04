import axios from "axios";
import sprintsAction from "../actions/sprintsAction.js";

// TODO убрать после готового бека
const sprints = [
  {
    id: 1,
    name: "Sprint Burndown Chart 1",
    startDate: "10.06.2020",
    finishDate: "22.06.2020",
    duration: 12,
  },
  {
    id: 2,
    name: "Sprint Burndown Chart 2",
    startDate: "10.06.2020",
    finishDate: "22.06.2020",
    duration: 12,
  },
  {
    id: 3,
    name: "Sprint Burndown Chart 3",
    startDate: "10.06.2020",
    finishDate: "22.06.2020",
    duration: 12,
  },
  {
    id: 4,
    name: "Sprint Burndown Chart 4",
    startDate: "10.06.2020",
    finishDate: "22.06.2020",
    duration: 12,
  },
];

const addSprint = (name, startDate, finishDate, duration) => (dispatch) => {
  dispatch(sprintsAction.addSprintRequest());

  //TODO написать логику для запроса, название полей не менять)

  axios
    .post("sprints", { name })
    .then(({ data }) => dispatch(sprintsAction.addSprintSuccess(data)))
    .catch((error) => dispatch(sprintsAction.addSprintError(error)));
};

const fetchSprints = () => (dispatch) => {
  dispatch(sprintsAction.fetchSprintsRequest());
  // TODO убрать после готового бека
  dispatch(sprintsAction.fetchSprintsSuccess(sprints));

  // TODO расскоментить после готового бека
  // axios
  //   .get("sprints")
  //   .then(({ data }) => dispatch(sprintsAction.fetchSprintsSuccess(data)))
  //   .catch((error) => dispatch(sprintsAction.fetchSprintsError(error)));
};

const deleteSprint = (id) => (dispatch) => {
  dispatch(sprintsAction.deleteSprintRequest());

  axios
    .delete(`sprints/${id}`)
    .then(() => dispatch(sprintsAction.deleteSprintSuccess(id)))
    .catch((error) => dispatch(sprintsAction.deleteSprintError(error)));
};

export default {
  addSprint,
  fetchSprints,
  deleteSprint,
};
