import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionStorageService {
  itemValue = new Subject();

  static getItem(key) {
    return sessionStorage.getItem(key);
  }

  setItem(key, value) {
    this.itemValue.next(value);
    sessionStorage.setItem(key, value);
  }
}
