import { createSelector } from "reselect";

export const tasksSelector = (state) => state.sprints;
export const allTasksSelector = (state) => tasksSelector(state).items;
export const errorSelector = (state) => tasksSelector(state).error;
export const filterSelector = (state) => tasksSelector(state).filter;
export const loaderSelector = (state) => tasksSelector(state).loading;

export const getVisibleTasks = createSelector(
  [allTasksSelector, filterSelector],
  (tasks, filter) => {
    return tasks.filter((task) =>
      task.name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
