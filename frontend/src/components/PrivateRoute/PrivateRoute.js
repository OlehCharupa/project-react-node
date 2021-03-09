import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { isLogin } from '../../redux/selectors/selectors'; // тестовая логика, пока не заменят.

import { paths } from '../../routes/routes';

const PrivateRoute = ({ component: Component, ...routeProps }) => {
    const isLoginState = useSelector(isLogin)
    return (
        <Route
            {...routeProps}
            render={props => isLoginState
                ? <Component {...props} />
                : <Redirect to={paths.login} />
            }
        />
    )
};

export default PrivateRoute;