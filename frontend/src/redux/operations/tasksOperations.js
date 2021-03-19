import axios from "axios";
import moment from "moment";
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

const fetchTasks = (sprintId) => async (dispatch) => {
  await dispatch(tasksAction.fetchTasksRequest());
  await dispatch(tasksAction.changeCurrentDayIndex(0));

  try {
    const result = await axios.get(`task/${sprintId}`);
    await dispatch(
      tasksAction.changeCurrentDayIndex(findCurrentDay(result.data))
    );
    dispatch(tasksAction.fetchTasksSuccess(result.data));
  } catch (error) {
    dispatch(tasksAction.fetchTasksError(error));
  }
};

const deleteTask = (id) => (dispatch) => {
  dispatch(tasksAction.deleteTaskRequest());

  axios
    .delete(`task/${id}`)
    .then(() => dispatch(tasksAction.deleteTaskSuccess(id)))
    .catch((error) => dispatch(tasksAction.deleteTaskError(error)));
};

const updateTask = (id, singleHoursWasted, currentDay, index) => (dispatch) => {
  dispatch(tasksAction.updateTaskRequest());

  axios
    .patch(`task/${id}`, { hours: singleHoursWasted, date: currentDay })
    .then(({ data }) =>
      dispatch(tasksAction.updateTaskSuccess({ ...data, id, index }))
    )
    .catch((error) => dispatch(tasksAction.updateTaskError(error)));
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  addTask,
  fetchTasks,
  deleteTask,
  updateTask,
};

function findCurrentDay(data) {
  if (!data.length) {
    return 0;
  }
  const currentDate = moment().format("DD-MM-YYYY");
  const hoursWastedPerDay = data[0].hoursWastedPerDay;
  const index = hoursWastedPerDay.findIndex(
    (value) => value.currentDay === currentDate
  );

  if (index < 0) {
    return 0;
  }

  return index;
}
