import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as userActions from 'src/app/modules/core/store/user/user.actions';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { IUser } from 'src/app/shared/models/user';
import { Router } from '@angular/router';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  currentRoute: string;
  navbarSubscription: Subscription;
  user: IUser = {
    displayName: null,
    dobDay: null,
    dobMonth: null,
    dobYear: null,
    email: null,
    emailVerified: false,
    onboardingComplete: false,
    postcode: null,
    selectedCurrency: null,
    selectedTimezone: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    uid: null,
    username: null,
    photoURL: '/assets/img/anonymous.jpg',
    firstName: null,
    lastName: null
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authStore: Store<fromAuth.State>,
    private router: Router,
    private userStore: Store<fromUser.State>
  ) {}

  get isLoggedIn() {
    return AuthService.isLoggedIn();
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset ]);
    this.currentRoute = this.router.url;
    this.navbarSubscription = RouterService.currentRoute.subscribe(result => {
      if (result) {
        this.currentRoute = result;
      }
    });
  }

  signOut() {
    this.userStore.dispatch(userActions.signOut());
    this.authStore.dispatch(authActions.signOut());
  }
}
