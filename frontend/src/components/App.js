import React, { Suspense, useEffect } from "react";
import { Switch, Redirect, useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routes from "../routes/routes";
import authOperations from "../redux/operations/authOperations";
import Loader from "./Loader/Loader";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Container from "./Container/Container";
import Header from "./Header/Header";
import { errorSelector } from "../redux/selectors/sprints-selectors";
import sprintsOperations from "../redux/operations/sprintsOperations";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { projectId } = useParams();
  const error = useSelector((state) => errorSelector(state));

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error.response && error.response.status === 403) {
      alert("На жаль Ви не є учасником данного проекту ");
      history.push({
        pathname: "/projects",
      });
      dispatch(sprintsOperations.resetError());
    }
  }, [projectId, error, history, dispatch]);

  return (
    <div className="App">
      <Container>
        <Header />
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
