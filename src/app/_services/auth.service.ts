import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private myRoute: Router,
    private userService: UserService
  ) { }

  getToken() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    if (this.userService.getUserAccount()) {
      console.log('User is logged in');
      return true;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.myRoute.navigate(['login']);
  }
}
