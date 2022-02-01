import {makeAutoObservable} from 'mobx';

class AuthStore {
  errors = false;
  loggedVia = '';

  constructor() {
    makeAutoObservable(this);
  }

  setErrors(value) {
    this.errors = value;
  }

  setLoggedVia(value) {
    this.loggedVia = value;
  } 
}

export default new AuthStore();
