import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {
  currentRoute = new BehaviorSubject<string>('/');

  constructor(
    public router: Router
  ) {
  }

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

  static checkIfIsOnDomain() {
    const full = window.location.host;
    const parts = full.split('.');
    let result = true;
    if (parts.length === 3 && parts[1] !== 'netlify') {
      result = false;
      (window as any).Intercom('update', {
        'hide_default_launcher': true
      });
    }
    return result;
  }

  setCurrentRoute() {
    if (this.currentRoute.getValue().indexOf('website') > -1) {
      (window as any).Intercom('update', {
        'hide_default_launcher': true
      });
    } else {
      (window as any).Intercom('update', {
        'hide_default_launcher': false
      });
    }
    localStorage.setItem('currentRoute', this.currentRoute.getValue());
  }
}
