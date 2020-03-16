import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-forgot-password-form',
  templateUrl: './forgot-password-form.component.html'
})
export class ForgotPasswordFormComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  model: any = {};
  showEmailInputError = false;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
  }

  checkEmailInputError() {
    this.showEmailInputError = !this.model.email || this.model.email.length.trim === 0;
  }

  submitPasswordResetRequest() {
    this.checkEmailInputError();
    if (this.showEmailInputError === false) {
      this.authService.resetPassword(this.model['email']);
    }
  }
}
