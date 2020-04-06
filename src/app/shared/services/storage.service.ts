import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  static setItem(key, value) {
    sessionStorage.setItem(key, value);
  }
}
