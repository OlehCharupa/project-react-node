import {createReducer} from '@reduxjs/toolkit';
import {loaderOff, loaderOn} from '../actions/loaderAction';

export const loader = createReducer(false, {
    [loaderOff]: () => false,
    [loaderOn]: () => true,
})