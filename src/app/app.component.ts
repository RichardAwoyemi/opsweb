import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subscription } from 'rxjs';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import * as fromAuth from 'src/app/modules/core/store/auth/auth.reducer';
import * as userActions from 'src/app/modules/core/store/user/user.actions';
import * as authActions from 'src/app/modules/core/store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { IUser } from './shared/models/user';
import { Router } from '@angular/router';
import { RouterService } from './shared/services/router.service';
import { AuthService } from './modules/auth/auth.service';

declare let window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  referredBy: string;
  user: any;
  private authSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public afAuth: AngularFireAuth,
    public router: Router,
    private routerService: RouterService,
    private authService: AuthService,
    private authStore: Store<fromAuth.State>,
    private userStore: Store<fromUser.State>
  ) {
    this.afAuth.auth.getRedirectResult().then((result) => {
      if (result.user && this.authService.isLoggedIn()) {
        this.referredBy = JSON.parse(localStorage.getItem('referredBy'));
        if (this.referredBy) {
          this.processMobileReferralLogin(result);
        } else {
          this.processMobileLogin(result);
        }
        localStorage.removeItem('referredBy');
      }
    });
  }

  private static assignUserProfile(additionalUserInfo: any, providerId: string) {
    if (providerId === 'google.com') {
      return {
        firstName: additionalUserInfo['given_name'],
        lastName: additionalUserInfo['family_name'],
        email: additionalUserInfo['email'],
        displayName: additionalUserInfo['name'],
        photoURL: additionalUserInfo['picture'],
      };
    }
    if (providerId === 'facebook.com') {
      return {
        firstName: additionalUserInfo['first_name'],
        lastName: additionalUserInfo['last_name'],
        email: additionalUserInfo['email'],
        displayName: additionalUserInfo['name'],
        photoURL: additionalUserInfo['picture']['data']['url'],
      };
    }
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);

    this.authSubscription = this.afAuth.authState.subscribe(result => {
      if (result) {
        localStorage.setItem('uid', result.uid);
        this.authStore.dispatch(authActions.getData());
        this.userStore.dispatch(userActions.getData());
      }
    });

    this.userStore.select('user').pipe().subscribe(async (result: IUser) => {
      if (result && this.authService.isLoggedIn()) {
        this.redirectUser();
      }
    });
  }

  processMobileLogin(response) {
    this.isMobile.subscribe(result => {
      if (result.matches && !this.referredBy && response && response.user.providerData[0].providerId === 'facebook.com' ||
        result.matches && response && response.user.providerData[0].providerId === 'google.com') {
        this.authService.mobileLogin(AppComponent.assignUserProfile(response.additionalUserInfo.profile, response.user.providerData[0].providerId), response.user.uid).then(() => {
        });
      }
    });
  }

  processMobileReferralLogin(response) {
    this.isMobile.subscribe(result => {
      if (result.matches && this.referredBy && response && response.user.providerData[0].providerId === 'facebook.com' ||
        result.matches && this.referredBy && response && response.user.providerData[0].providerId === 'google.com') {
        this.authService.mobileReferralLogin(AppComponent.assignUserProfile(response.additionalUserInfo.profile, response.user.providerData[0].providerId), response.user.uid, this.referredBy).then(() => {
        });
      }
    });
  }

  redirectUser() {
    this.router.navigate([RouterService.getCurrentRoute()]).then(() => {
    });
  }

  onActivate() {
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
