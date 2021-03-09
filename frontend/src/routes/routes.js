import { lazy } from 'react';


export const paths = {
    home: '/',
    registration: '/registration',
    login: '/login',
    projects: '/projects',
    projectId: '/projects/:projectId/sprints',
    sprintId: '/projects/:projectId/sprints/:sprintId',
}

const routes = [
    {
        path: paths.home,
        label: 'Домашняя страница',
        exact: true,
        component: lazy(() => import('../pages/Registration-page/index.js')), //раскомментировать,  в импорт внести место и имя своего компонента
        private: false,
        restricted: true,
    },

    {
        path: paths.registration,
        label: 'Регистрация',
        component: lazy(() => import('../pages/Registration-page/index.js')), //раскомментировать,  в импорт внести место и имя своего компонента
        private: false,
        restricted: true,
    },
    {
        path: paths.login,
        label: 'Вход',
        component: lazy(() => import('../pages/Login-page/index.js')), //раскомментировать,  в импорт внести место и имя своего компонента
        private: false,
        restricted: true,
    },
    {
        path: paths.projects,
        label: 'Проекты',
        // component: lazy(() => import('../pages/......')), //раскомментировать,  в импорт внести место и имя своего компонента
        component: () => <h1>Project</h1>, // удалить строку
        private: true,
        restricted: true,
    },
    {
        path: paths.projectId,
        label: 'Проект',
        // component: lazy(() => import('../pages/......')), //раскомментировать,  в импорт внести место и имя своего компонента
        private: true,
        restricted: true,
    },
    {
        path: paths.sprintId,
        label: 'Спринт',
        // component: lazy(() => import('../pages/......')), //раскомментировать,  в импорт внести место и имя своего компонента
        private: true,
        restricted: true,
    }

]
export default routes;