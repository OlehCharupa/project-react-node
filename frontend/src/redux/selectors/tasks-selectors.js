import { createSelector } from "reselect";

export const tasksSelector = (state) => state.tasks;
export const allTasksSelector = (state) => tasksSelector(state).items;
export const errorSelector = (state) => tasksSelector(state).error;
export const filterSelector = (state) => tasksSelector(state).filter;
export const loaderSelector = (state) => tasksSelector(state).loading;

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
