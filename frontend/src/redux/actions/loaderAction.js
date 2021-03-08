import {createAction } from '@reduxjs/toolkit';
import {LOADER_OFF, LOADER_ON} from '../constants/loaderConstants';

export const loaderOn = createAction(LOADER_ON, (payload) => ({
    payload: payload.message,
}));

export const loaderOff = createAction(LOADER_OFF);