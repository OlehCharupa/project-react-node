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
  {
    id: 5,
    name: "KN-1 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 6,
    name: "KN-2 Configure project",
    plannedHours: 4,
    wastedHoursPerDay: 2,
    wastedHours: 0,
  },
  {
    id: 7,
    name: "KN-3 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 8,
    name: "KN-4 Configure project",
    plannedHours: 13,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 9,
    name: "KN-1 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 10,
    name: "KN-2 Configure project",
    plannedHours: 4,
    wastedHoursPerDay: 2,
    wastedHours: 0,
  },
  {
    id: 11,
    name: "KN-3 Configure project",
    plannedHours: 8,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
  {
    id: 12,
    name: "KN-4 Configure project",
    plannedHours: 13,
    wastedHoursPerDay: 3,
    wastedHours: 0,
  },
];

const addTask = ({sprintId, title, hoursPlanned}) => (
  dispatch
) => {
  dispatch(tasksAction.addTaskRequest());

  axios
    .post(`task/${sprintId}`, { title, hoursPlanned})
    .then(({ data }) => dispatch(tasksAction.addTaskSuccess(data)))
    .catch((error) => dispatch(tasksAction.addTaskError(error)));
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

const updateTask = (id, whpd) => (dispatch) => {
  dispatch(tasksAction.updateTaskRequest());

  axios
    .patch("tasks", { id, wastedHoursPerDay: whpd })
    .then(({ data }) => dispatch(tasksAction.updateTaskSuccess(data)))
    .catch((error) => dispatch(tasksAction.updateTaskError(error)));
};

export default {
  addTask,
  fetchTasks,
  deleteTask,
  updateTask,
};
