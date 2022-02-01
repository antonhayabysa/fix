import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
import {
    loginRequest,
    getError,
    loginSuccess,
} from './auth-actions';

const token = createReducer(null, {
    [loginSuccess]: (_, { payload }) => payload.token,
  });
const setError = (_, { payload }) => payload;

const error = createReducer('', {
  [getError]: setError,
  [loginRequest]: () => null,
});

const isAuthenticated = createReducer(false, {
  [loginSuccess]: () => true
});

const isLoading = createReducer(false, {
  [loginRequest]: () => true,
  [getError]: () => false,
});

export default combineReducers({
  token,
  error,
  isAuthenticated,
});

