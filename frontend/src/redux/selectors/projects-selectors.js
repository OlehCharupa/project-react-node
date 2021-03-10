export const projectsSelector = (state) => state.projects;
export const allProjectsSelector = (state) => projectsSelector(state).items;
export const loaderSelector = (state) => projectsSelector(state).loading;
