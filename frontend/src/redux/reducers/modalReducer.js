import { createReducer } from '@reduxjs/toolkit';
import { MODAL_TOGGLE } from '../constants/modalConstants';

const initiallState = false;

const modalReducer = createReducer(initiallState, {
  [MODAL_TOGGLE]:(state,{payload})=> payload,
})

export default modalReducer

