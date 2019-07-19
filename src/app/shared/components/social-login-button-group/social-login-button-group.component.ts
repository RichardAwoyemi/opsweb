import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';

@Component({
  selector: 'app-social-login-button-group',
  templateUrl: './social-login-button-group.component.html'
})
export class SocialLoginButtonGroupComponent implements OnInit {
  @Input() referredById: string;
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private store: Store<fromAuth.State>
  ) { }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
  }

  googleSignIn() {
    this.store.dispatch(authActions.googleSignIn());
  }

  mobileGoogleSignIn() {
    this.store.dispatch(authActions.mobileGoogleSignIn());
  }
  facebookSignIn() {
    this.store.dispatch(authActions.facebookSignIn());
  }

  mobileFacebookSignIn() {
    this.store.dispatch(authActions.mobileFacebookSignIn());
  }
}
