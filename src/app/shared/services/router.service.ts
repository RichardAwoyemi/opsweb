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

  static checkLoggedOutRoute(currentRoute) {
    return currentRoute === '/' || currentRoute === '/login' || currentRoute === '/register' ||
      currentRoute === '/press' || currentRoute === '/legal' || currentRoute === '/forgot-password' ||
      currentRoute === '/verify-email' || currentRoute.includes('/invite/');
  }

  setCurrentRoute() {
    localStorage.setItem('currentRoute', this.currentRoute.getValue());
  }
}
