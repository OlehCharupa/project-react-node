import axios from 'axios';
import { loaderOn, loaderOff } from '../actions/loaderAction';
import { errorOn } from '../actions/errorActon';
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
export const Registration = (obj) => async (dispatch) => {
    dispatch(authAction.registerRequest());
    try {
        dispatch(loaderOn());
        const result = await axios.post('/auth/register', {...obj})
        token.set(result.data.token);
        dispatch(authAction.registerSuccess(result.data));
        console.log('reg', dispatch(authAction.registerSuccess(result)));
    } catch (error) {
        dispatch(authAction.registerError(error));
        console.log('err',  dispatch(authAction.registerError(error)));
    } finally{
        dispatch(loaderOff());
    }
}