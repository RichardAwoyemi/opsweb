import { Component, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { NGXLogger } from 'ngx-logger';
import { ModalService } from 'src/app/shared/services/modal.service';
import { UtilService } from 'src/app/shared/services/util.service';
import { Router } from '@angular/router';

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
    public modalService: ModalService,
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
}
