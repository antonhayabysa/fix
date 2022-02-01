import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getError,
  loginRequest,
  loginSuccess,
  setPass,
} from './auth-actions';
import authParameters from './authParams';
import axios from 'axios';

const login = (userData, callback) => async dispatch => {
  dispatch(loginRequest());

  const data = new FormData();
  if (userData?.[authParameters.login]) {
    data.append(authParameters.login, userData[authParameters.login]);
  }
  const secondDataParameter = Object.keys(userData).find(
    itm => itm !== authParameters.login,
  );
  data.append(secondDataParameter, userData[secondDataParameter]);

  try {
    const res = await fach('https://ecomap.online/auth/convert-token/', {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    console.log("User token from server:",res.data.token)
    if (res.data.status) {
      const token = res.data.token;
      dispatch(getApiInfo(token));
      dispatch(
        setPass({
          pass: userData[secondDataParameter],
          type: secondDataParameter,
        }),
      );
      dispatch(loginSuccess(res.data));
      callback();
      return;
    }
  } catch (error) {
    dispatch(getError(error.message));
  }
};
export default {
  login,
};
