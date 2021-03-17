import axios from "axios";
import sprintsAction from "../actions/sprintsAction.js";

const addSprint = ({ projectId, title, startDate, duration }) => (dispatch) => {
  dispatch(sprintsAction.addSprintRequest());

  axios
    .post(`sprint/${projectId}`, {
      title,
      startDate,
      duration,
    })
    .then(({ data }) => {
      dispatch(sprintsAction.addSprintSuccess({ ...data, _id: data.id }));
    })
    .catch((error) => dispatch(sprintsAction.addSprintError(error)));
};

const fetchSprints = (projectId) => (dispatch) => {
  dispatch(sprintsAction.fetchSprintsRequest());

  axios
    .get(`sprint/${projectId}`)
    .then(({ data }) =>
      dispatch(sprintsAction.fetchSprintsSuccess(data.message ? [] : data))
    )
    .catch((error) => dispatch(sprintsAction.fetchSprintsError(error)));
};

const deleteSprint = (id) => (dispatch) => {
  dispatch(sprintsAction.deleteSprintRequest());

  axios
    .delete(`sprint/${id}`)
    .then(() => dispatch(sprintsAction.deleteSprintSuccess(id)))
    .catch((error) => dispatch(sprintsAction.deleteSprintError(error)));
};

const updateSprint = (id, title) => (dispatch) => {
  dispatch(sprintsAction.updateSprintRequest());

  axios
    .patch(`sprint/${id}`, { title })
    .then(() => dispatch(sprintsAction.updateSprintSuccess(id)))
    .catch((error) => dispatch(sprintsAction.updateSprintError(error)));
};

export default {
  addSprint,
  fetchSprints,
  deleteSprint,
  updateSprint,
};
