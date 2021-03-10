import React, { Suspense } from "react";
import styles from "./App.module.css";
import Container from "../components/Container/Container";
import Header from "./Header/Header";
import routes from "../routes/routes.js"
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicRoute from "./PublicRoute/PublicRoute";

function App() {
  return (
    <Container>
      <Header />
      <Suspense fallback={`<h1>Loading</h1>`}>
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
