import React, { Suspense, useEffect } from "react";
import { Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "../routes/routes";
import authOperations from "../redux/operations/authOperations";
import Loader from "./Loader/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Container from "./Container/Container";
import Header from "./Header/Header";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, []);

  return (
    <div className="App">
      <Header />
      <Container>
        <Suspense fallback={<Loader />}>
          <Switch>
            {routes.map((route) =>
              route.private ? (
                <PrivateRoute key={route.label} {...route} />
              ) : (
                <PublicRoute
                  key={route.label}
                  {...route}
                  restricted={route.restricted}
                />
              )
            )}
            <Redirect to="/registration"></Redirect>
          </Switch>
        </Suspense>
      </Container>
    </div>
  );
};

export default App;
