import { createSelector } from "reselect";

export const tasksSelector = (state) => state.tasks;
export const allTasksSelector = (state) => tasksSelector(state).items;
export const errorSelector = (state) => tasksSelector(state).error;
export const filterSelector = (state) => tasksSelector(state).filter;
export const loaderSelector = (state) => tasksSelector(state).loading;
export const currentDayIndexSelector = (state) => tasksSelector(state).dayIndex;

export const getVisibleTasks = createSelector(
  [allTasksSelector, filterSelector],
  (tasks, filter) => {
    return filter
      ? tasks.filter((task) =>
          task.title.toLowerCase().includes(filter.toLowerCase())
        )
      : tasks;
  }
);

export const getCurrentDay = createSelector(
  [allTasksSelector, currentDayIndexSelector],
  (tasks, index) => {
    if (tasks.length > 0 && index < tasks[0].hoursWastedPerDay.length) {
      return tasks[0].hoursWastedPerDay[index].currentDay;
    }
    return null;
  }
);

export const getSingleHoursWasted = createSelector(
  [(state, hoursWastedPerDay) => hoursWastedPerDay, currentDayIndexSelector],
  (hoursWastedPerDay, index) => {
    if (hoursWastedPerDay && index < hoursWastedPerDay.length) {
      return hoursWastedPerDay[index].singleHoursWasted;
    }
    return 0;
  }
);
