import { lazy } from 'react';

export const paths = {
    registration: '/registration',
    login: '/login',
    projects: '/projects',
    projectId: '/projects/:projectId/sprints',
    sprintId: '/projects/:projectId/sprints/:sprintId',
}

const routes = [
    {
        path: paths.registration,
        label: 'Регистрация',
        // component: lazy(() => import('../pages/.......')), //раскомментировать,  в импорт внести место и имя своего компонента
        component: () => <h1>Registration</h1>, // удалить строку
        private: false,
        restricted: true,
    },
    {
        path: paths.login,
        label: 'Вход',
        // component: lazy(() => import('../pages/.....')), //раскомментировать,  в импорт внести место и имя своего компонента
        component: () => <h1>Login</h1>, // удалить строку
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