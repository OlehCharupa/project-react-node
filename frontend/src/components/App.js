import React, { Suspense } from "react";
import styles from "./App.module.css";
import Container from "./Container/Container";
import Header from "./Header/Header";
import routes from "../routes/routes.js"
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";
import Spiner from "./Spiner/Spiner";

function App() {
  return (
    <Container>
      <Header />
      <Suspense fallback={<Spiner />}>
        <Switch>
          {routes.map((route) => {
            return route.private ? (
              <PrivateRoute key={route.label} {...route} />
            ) : (
                <PublicRoute key={route.label} {...route} />
              );
          })}
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
