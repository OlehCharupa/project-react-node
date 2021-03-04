export const sprintsSelector = (state) => state.sprints;
export const allSprintsSelector = (state) => sprintsSelector(state).items;
export const errorSelector = (state) => sprintsSelector(state).error;
export const loaderSelector = (state) => sprintsSelector(state).loading;
