import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '@env'

import UserStore from '../store/UserStore.js';
import AuthStore from '../../store/AuthStore.js';


const logOut = (navigation) => {
    const token = UserStore.token
    console.log(token)
    
    const LOUGOUT_URL = `${API_URL}/auth/token/logout`
    fetch(LOUGOUT_URL, {
      method: 'POST',
      'Content-Type': 'application/json',
      headers: {
        Authorization:`Token ${token}`,
      }
    })
    .then(response => response)
    .then(json => {
              console.log(json)
            if (!json.detail) {
              AsyncStorage.removeItem('userToken');
              console.log(`User with token ${token} was loged out successfully!`);
              navigation.navigate('SignInScreen')
              AuthStore.setErrors(false);
            } else {
              AuthStore.setErrors(json);
            }
          })
    .catch(error => {
        alert(error);
    })
  };

export {logOut}

