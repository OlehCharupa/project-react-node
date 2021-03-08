import axios from 'axios';
import { loaderOn, loaderOff } from '../actions/loaderAction';
import { errorOn } from '../actions/errorActon';
import { setUserData } from '../actions/signUpAction;'

axios.defaults.baseURL = "https://slimmom-backend.herokuapp.com";

export const Registration = ({ email, password }) => async (dispatch) => {
    try {
        dispatch(loaderOn());
        const result = await axios.post('/auth/register', { email, password })
        dispatch(setUserData(result))
    } catch (error) {
        dispatch(errorOn(error))
    } finally{
        dispatch(loaderOff());
    }
}