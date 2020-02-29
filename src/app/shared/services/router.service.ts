import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterService {
  currentRoute = new BehaviorSubject<string>('/');

  static getCurrentRoute() {
    const currentRoute = localStorage.getItem('currentRoute');
    if (!currentRoute) {
      return 'dashboard';
    }
    return currentRoute;
  }

  setCurrentRoute() {
    localStorage.setItem('currentRoute', this.currentRoute.getValue());
  }
}
