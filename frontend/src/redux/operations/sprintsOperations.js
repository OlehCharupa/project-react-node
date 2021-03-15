import axios from "axios";
import sprintsAction from "../actions/sprintsAction.js";

const addSprint = ({projectId, title, startDate, finishDate, duration}) => (dispatch) => {
  dispatch(sprintsAction.addSprintRequest());

  //TODO написать логику для запроса, название полей не менять)

  axios
    .post(`sprint/${projectId}`, { title, startDate:startDate, duration:duration })
    .then(({ data }) => dispatch(sprintsAction.addSprintSuccess(data)))
    .catch((error) => dispatch(sprintsAction.addSprintError(error)));
};

const fetchSprints = (projectId) => (dispatch) => {
  dispatch(sprintsAction.fetchSprintsRequest());

  axios
    .get(`sprint/${projectId}`)
    .then(({ data }) => dispatch(sprintsAction.fetchSprintsSuccess(data)))
    .catch((error) => dispatch(sprintsAction.fetchSprintsError(error)));
};

const deleteSprint = (id) => (dispatch) => {
  dispatch(sprintsAction.deleteSprintRequest());

  axios
    .delete(`sprint/${id}`)
    .then(() => dispatch(sprintsAction.deleteSprintSuccess(id)))
    .catch((error) => dispatch(sprintsAction.deleteSprintError(error)));
};

export default {
  addSprint,
  fetchSprints,
  deleteSprint,
};
