import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-social-login-button-group',
  templateUrl: './social-login-button-group.component.html'
})
export class SocialLoginButtonGroupComponent implements OnInit {
  @Input() referredById: string;
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  mobileGoogleSignIn() {
    this.authService.mobileGoogleSignIn();
  }

  googleSignInWithReferral() {
    this.authService.googleSignInWithReferral(this.referredById);
  }


  mobileGoogleSignInWithReferral() {
    this.authService.mobileGoogleSignInWithReferral(this.referredById);
  }

  facebookSignIn() {
    this.authService.facebookSignIn();
  }

  mobileFacebookSignIn() {
    this.authService.mobileFacebookSignIn();
  }

  facebookSignInWithReferral() {
    this.authService.facebookSignInWithReferral(this.referredById);
  }

  mobileFacebookSignInWithReferral() {
    this.authService.mobileFacebookSignInWithReferral(this.referredById);
  }
}
