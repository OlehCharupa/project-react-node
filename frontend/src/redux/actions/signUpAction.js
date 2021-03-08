import {createAction} from '@reduxjs/toolkit';
import {SET_USER_DATA} from '../constants/signUpConsrants';

export const setUserData = createAction(SET_USER_DATA, (payload) => ({
    payload: {
        email: payload.user.email,
        _id: payload.user._id,
    }
}))