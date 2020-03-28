import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SimpleModalService } from 'src/app/shared/components/simple-modal/simple-modal.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html'
})
export class LoginFormComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  model: any = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    public simpleModalService: SimpleModalService,
    public ngZone: NgZone,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  login() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signIn(email, password).then((result) => {
      if (result['user'].emailVerified !== false) {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']).then(() => {
          });
        });
      } else {
        this.router.navigate(['verify-email']).then(() => {
        });
        this.simpleModalService.displayMessage('Oops!', 'Your email account has not been verified yet.');
      }
    }, error => {
      this.simpleModalService.displayMessage('Oops!', error.message);
    });
  }
}
