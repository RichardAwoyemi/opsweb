import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs';
import { SimpleModalService } from 'src/app/shared/components/simple-modal/simple-modal.service';
import { UtilService } from 'src/app/shared/services/util.service';
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
    private logger: NGXLogger,
    public simpleModalService: SimpleModalService,
    public utilService: UtilService,
    public ngZone: NgZone,
    public router: Router
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  login() {
    const email = this.model.email;
    const password = this.model.password;
    this.authService.signIn(email, password).then((result) => {
      this.logger.debug(JSON.stringify(result['user']));
      if (result['user'].emailVerified !== false) {
        localStorage.setItem('user', JSON.stringify(result['user']));
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
