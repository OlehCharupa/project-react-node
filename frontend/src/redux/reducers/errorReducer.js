import {createReducer} from '@reduxjs/toolkit';
import {errorOff, errorOn} from '../actions/errorActon';

export const error = createReducer(false, {
    [errorOff]: false,
    [errorOn]: true,
})