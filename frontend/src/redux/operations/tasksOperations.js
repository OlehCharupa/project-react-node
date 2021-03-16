import axios from "axios";
import tasksAction from "../actions/tasksAction";

const addTask = ({ sprintId, title, hoursPlanned }) => (dispatch) => {
  dispatch(tasksAction.addTaskRequest());

  axios
    .post(`task/${sprintId}`, { title, hoursPlanned })
    .then(({ data }) =>
      dispatch(tasksAction.addTaskSuccess({ ...data, _id: data.id }))
    )
    .catch((error) => dispatch(tasksAction.addTaskError(error)));
};

const fetchTasks = (sprintId) => (dispatch) => {
  dispatch(tasksAction.fetchTasksRequest());
  axios
    .get(`task/${sprintId}`)
    .then(({ data }) =>
      dispatch(tasksAction.fetchTasksSuccess(data.message ? [] : data))
    )
    .catch((error) => dispatch(tasksAction.fetchTasksError(error)));
};

const deleteTask = (id) => (dispatch) => {
  dispatch(tasksAction.deleteTaskRequest());

  axios
    .delete(`task/${id}`)
    .then(() => dispatch(tasksAction.deleteTaskSuccess(id)))
    .catch((error) => dispatch(tasksAction.deleteTaskError(error)));
};

const updateTask = (id, whpd) => (dispatch) => {
  dispatch(tasksAction.updateTaskRequest());

  axios
    .patch("task", { id, wastedHoursPerDay: whpd })
    .then(({ data }) => dispatch(tasksAction.updateTaskSuccess(data)))
    .catch((error) => dispatch(tasksAction.updateTaskError(error)));
};

export default {
  addTask,
  fetchTasks,
  deleteTask,
  updateTask,
};
