import axios from "axios";
import tasksAction from "../actions/tasksAction";

// TODO убрать после готового бека
const tasks = [
  {
    id: 1,
    name: "KN-1 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 2,
    name: "KN-2 Configure project",
    plannedHours: 4,
    wastedHoursPerDay: 2,
    wastedHours: 0,
  },
  {
    id: 3,
    name: "KN-3 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 4,
    name: "KN-4 Configure project",
    plannedHours: 13,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
];

const addTask = (name, plannedHours, wastedHoursPerDay, wastedHours) => (
  dispatch
) => {
  dispatch(tasksAction.addSprintRequest());

  axios
    .post("tasks", { name, plannedHours, wastedHoursPerDay, wastedHours })
    .then(({ data }) => dispatch(tasksAction.addSprintSuccess(data)))
    .catch((error) => dispatch(tasksAction.addSprintError(error)));
};

const fetchTasks = () => (dispatch) => {
  dispatch(tasksAction.fetchTasksRequest());
  // TODO убрать после готового бека
  dispatch(tasksAction.fetchTasksSuccess(tasks));

  // TODO расскоментить после готового бека
  // axios
  //   .get("tasks")
  //   .then(({ data }) => dispatch(tasksAction.fetchTasksSuccess(data)))
  //   .catch((error) => dispatch(tasksAction.fetchTasksError(error)));
};

const deleteTask = (id) => (dispatch) => {
  dispatch(tasksAction.deleteTaskRequest());

  axios
    .delete(`tasks/${id}`)
    .then(() => dispatch(tasksAction.deleteTaskSuccess(id)))
    .catch((error) => dispatch(tasksAction.deleteTaskError(error)));
};

export default {
  addTask,
  fetchTasks,
  deleteTask,
};
