import {makeAutoObservable} from 'mobx';

class UserStore {
  crowns = 0;
  money = 0;
  rang = '';
  token = '';
  city = '';
  loggedVia = '';
  setLoggedVia(value) {
      this.loggedVia = value;
  } 
  constructor() {
    makeAutoObservable(this);
  }

  setUserCity(value) {
    this.city = value;
  }

  setUserToken(value) {
    this.token = value;
  }

  setCrowns(value) {
    this.crowns = value;
  }

  setMoney(value) {
    this.money = value;
  }

  setRang(value) {
    this.rang = value;
  }

  incrementCrowns() {
    this.crowns = this.crowns + 1;
  }

  clearStore() {
    this.crowns = 0;
    this.money = 0;
    this.rang = '';
    this.token = '';
    this.city = '';
    this.loggedVia = '';
  }
}

export default new UserStore();
