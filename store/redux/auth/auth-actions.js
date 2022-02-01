import { createAction } from '@reduxjs/toolkit';

export const loginRequest = createAction('auth/loginRequest');
export const loginSuccess = createAction('auth/loginSuccess');
export const setPass = createAction('auth/setPass');
export const getError = createAction('auth/getError');


