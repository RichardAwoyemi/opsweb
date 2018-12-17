import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService
  ) { }

  model: any = {};
  rememberMe = false;

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    if (sessionStorage.getItem('token')) {
      sessionStorage.removeItem('token');
    }
  }

  login() {
    const user = new User;
    user.username = this.model.username;
    user.password = this.model.password;
    console.log(this.rememberMe);
    this.userService.login(user, this.rememberMe);
  }

  toggleRememberMe() {
    console.log('test');
    this.rememberMe = !this.rememberMe;
  }
}
