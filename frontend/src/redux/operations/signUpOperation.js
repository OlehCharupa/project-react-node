import axios from "axios";
import { loaderOn, loaderOff } from "../actions/loaderAction";
import authAction from "../actions/authAction";

axios.defaults.baseURL = "https://bc24.herokuapp.com/";
const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = "";
  },
};
export const Registration = (obj) => async (dispatch) => {
  dispatch(authAction.registerRequest());
  try {
    dispatch(loaderOn());
    const result = await axios.post("/auth/register", { ...obj });
    token.set(result.data.accessToken);
    dispatch(authAction.registerSuccess(result.data));
  } catch (error) {
    dispatch(authAction.registerError(error));
  } finally {
    dispatch(loaderOff());
  }
};
