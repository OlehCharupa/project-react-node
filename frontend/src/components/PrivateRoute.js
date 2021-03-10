import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { isAuthenticated } from "../redux/selectors/authSelectors";

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);
const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
});
export default connect(mapStateToProps)(PrivateRoute);
