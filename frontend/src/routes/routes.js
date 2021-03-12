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
    component: lazy(
      () =>
        import(
          "../pages/Registration-page/"
        ) /* webpackChunkName: "registration-page" */
    ),
    private: false,
    restricted: true,
  },
  {
    path: paths.login,
    label: "Login",
    exact: true,
    component: lazy(
      () => import("../pages/Login-page/") /* webpackChunkName: "login-page" */
    ),
    private: false,
    restricted: true,
  },
  {
    path: paths.projects,
    label: "Projects",
    exact: true,
    component: lazy(
      () =>
        import(
          "../pages/ProjectPage/ProjectPage"
        ) /* webpackChunkName: "projects-page" */
    ),
    private: true,
    restricted: true,
  },
  {
    path: paths.projectId,
    label: "singleProject",
    exact: true,
    component: lazy(
      () =>
        import(
          "../pages/SprintPage/SprintPage"
        ) /* webpackChunkName: "singleProject-page" */
    ),
    private: true,
    restricted: true,
  },
  {
    path: paths.sprintId,
    label: "singleSprint",
    exact: true,
    component: lazy(
      () =>
        import(
          "../pages/SingleSprintPage/SingleSprintPage"
        ) /* webpackChunkName: "singleSprint-page" */
    ),
    private: true,
    restricted: true,
  },
];
export default routes;
