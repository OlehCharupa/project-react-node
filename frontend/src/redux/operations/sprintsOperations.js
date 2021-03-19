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

const updateSprint = (id, title) => (dispatch) => {
  dispatch(sprintsAction.updateSprintRequest());

  axios
    .patch(`sprint/title/${id}`, { title })
    .then(({ data }) =>
      dispatch(sprintsAction.updateSprintSuccess({ id, ...data }))
    )
    .catch((error) => dispatch(sprintsAction.updateSprintError(error)));
};

const resetError = () => (dispatch) => {
  dispatch(sprintsAction.changeError(""));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addSprint,
  fetchSprints,
  deleteSprint,
  updateSprint,
  resetError,
};
