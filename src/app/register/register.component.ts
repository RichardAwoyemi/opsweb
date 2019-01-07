import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './register.component.html',
})
export class RegisterComponent implements OnInit {
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}

  model: any = {};

  ngOnInit() {
    localStorage.removeItem('loggedIn');
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);
  }

  public resolved(captchaResponse: string) {
    if (environment.production === false) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
  }

  register() {
    const email = this.model.email;
    const password = this.model.password;
    const firstName = this.model.firstName;
    const lastName = this.model.lastName;
    this.authService.register(email, password, firstName, lastName);
  }


  googleSignIn() {
    this.authService.googleSignIn();
  }

  facebookSignIn() {
  }
}
