import {makeAutoObservable} from 'mobx';

class ShopStore {
  items = {};

  constructor() {
    makeAutoObservable(this);
  }

  addItem(name, item) {
    this.items[name] = item;
  }

  setTime(name, value) {
    this.items[name].time = value;
  }

  setActive(name, value) {
    this.items[name].isActive = value;
  }

  clearStore() {
    this.items = {};
  }
}

export default new ShopStore();
