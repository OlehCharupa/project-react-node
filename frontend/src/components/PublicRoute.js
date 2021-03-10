import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthenticated } from "../redux/selectors/authSelectors";

const PublicRoute = ({
  component: Component,
  isAuthenticated,
  restricted,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuthenticated && restricted ? (
        <Redirect to="/projects" />
      ) : (
        <Component {...props} />
      )
    }
  />
);
const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});
export default connect(mapStateToProps)(PublicRoute);
