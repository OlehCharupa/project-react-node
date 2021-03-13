import axios from "axios";
import authAction from "../actions/authAction";

axios.defaults.baseURL = "https://bc24.herokuapp.com/api";

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};

export const register = (credentials) => async (dispatch) => {
  dispatch(authAction.registerRequest());
  const { email, password } = credentials;
  const state = {
    email: email,
    password: password,
  };
  console.log("state", state);
  try {
    const result = await axios.post("/users/register", state);
    token.set(result.data.token);
    dispatch(authAction.registerSuccess(result.data));
  } catch (error) {
    dispatch(authAction.registerError(error));
  }
};

export const logIn = (credentials) => async (dispatch) => {
  dispatch(authAction.loginRequest());
  try {
    const result = await axios.post("/users/login", credentials);
    token.set(result.data.token);
    dispatch(authAction.loginSuccess(result.data));
  } catch (error) {
    dispatch(authAction.loginError(error));
  }
};

const logOut = () => async (dispatch) => {
  dispatch(authAction.logoutRequest());
  try {
    await axios.post("/users/logout");
    token.unset();
    dispatch(authAction.logoutSuccess());
  } catch (error) {
    dispatch(authAction.logoutError(error));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) {
    return;
  }

  token.set(persistedToken);
  dispatch(authAction.getCurrentUserRequest());
  try {
    const result = await axios.get("/users/current");
    dispatch(authAction.getCurrentUserSuccess(result.data));
  } catch (error) {
    dispatch(authAction.getCurrentUserError(error));
  }
};

export default { logIn, logOut, getCurrentUser };