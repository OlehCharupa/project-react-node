export const tasksSelector = (state) => state.tasks;
export const allTasksSelector = (state) => tasksSelector(state).items;
export const errorSelector = (state) => tasksSelector(state).error;
export const loaderSelector = (state) => tasksSelector(state).loading;
