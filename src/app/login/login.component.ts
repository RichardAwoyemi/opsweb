import { Component, OnInit, NgZone } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { UtilService } from '../_services/util.service';
import { NGXLogger } from 'ngx-logger';
import { ModalService } from '../_services/modal.service';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  errorMessage: String;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private logger: NGXLogger,
    public modalService: ModalService,
    public utilService: UtilService,
    public ngZone: NgZone,
    public router: Router
  ) { }

  model: any = {};

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
  }

  login() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signIn(email, password).then((result) => {
      this.logger.debug(JSON.stringify(result.user));
      if (result.user.emailVerified !== false) {
        localStorage.setItem('user', JSON.stringify(result.user));
        this.ngZone.run(() => { this.router.navigate(['dashboard']); });
      } else {
        this.router.navigate(['verify-email']);
        this.modalService.displayMessage('Oops!', 'Your email account has not been verified yet.');
      }
    }, error => {
      this.modalService.displayMessage('Oops!', error.message);
    });
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  mobileGoogleSignIn() {
    this.authService.mobileGoogleSignIn();
  }

  facebookSignIn() {
    this.authService.facebookSignIn();
  }

  mobileFacebookSignIn() {
    this.authService.mobileFacebookSignIn();
  }
}
