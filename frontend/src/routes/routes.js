import { lazy } from "react";

export const paths = {
  registration: "/registration",
  login: "/login",
  projects: "/projects",
  projectId: "/projects/:projectId",
  sprintId: "/projects/:projectId/:sprintId",
};

const routes = [
  {
    path: paths.registration,
    label: "Registration",
    exact: true,
    // component: lazy(() =>import("./Containers/Login/Login") /* webpackChunkName: "registration-page" */), //раскомментировать,  в импорт внести место и имя своего компонента
    private: false,
    restricted: true,
  },
  {
    path: paths.login,
    label: "Login",
    exact: true,
    // component: lazy(() =>import("./Containers/Login/Login") /* webpackChunkName: "login-page" */), //раскомментировать,  в импорт внести место и имя своего компонента
    private: false,
    restricted: true,
  },
  {
    path: paths.projects,
    label: "Projects",
    exact: true,
    // component: lazy(() =>import("./Containers/Login/Login") /* webpackChunkName: "projects-page" */), //раскомментировать,  в импорт внести место и имя своего компонента
    private: true,
    restricted: false,
  },
  {
    path: paths.projectId,
    label: "singleProject",
    exact: false,
    component: lazy(
      () =>
        import(
          "../components/Sprints/Sprints"
        ) /* webpackChunkName: "singleProject-page" */
    ),
    private: true,
    restricted: false,
  },
  {
    path: paths.sprintId,
    label: "singleSprint",
    exact: false,
    component: lazy(
      () =>
        import(
          "../components/Sprints/Sprints"
        ) /* webpackChunkName: "singleSprint-page" */
    ),
    private: true,
    restricted: false,
  },
];
export default routes;
