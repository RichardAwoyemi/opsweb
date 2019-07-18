import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth/services/auth.service';
import { UserService } from './shared/services/user.service';
import { UtilService } from './shared/services/util.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  user: any = {
    photoURL: '/assets/img/anonymous.jpg'
  };
  referredBy: string;
  onboardingComplete: boolean;
  accountType: boolean;

  private authSubscription: Subscription;
  private userSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private logger: NGXLogger,
    public userService: UserService,
    public utilService: UtilService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public authService: AuthService) {
    this.afAuth.authState.subscribe(response => {
      this.referredBy = localStorage.getItem('referredBy');
      this.processMobileLogin(response);
      this.processMobileReferralLogin(response);
      localStorage.removeItem('referredBy');
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.cacheUserProfile(user);
      }
    });
  }

  processMobileLogin(response) {
    this.isMobile.subscribe(result => {
      if (result.matches && !this.referredBy && response && response.providerData[0].providerId === 'facebook.com' ||
        result.matches && response && response.providerData[0].providerId === 'google.com') {
        this.authService.processMobileLogin(response.providerData[0], response.uid);
      }
    });
  }

  processMobileReferralLogin(response) {
    this.isMobile.subscribe(result => {
      if (result.matches && this.referredBy && response && response.providerData[0].providerId === 'facebook.com' ||
        result.matches && this.referredBy && response && response.providerData[0].providerId === 'google.com') {
        this.authService.processMobileReferralLogin(response.providerData[0], response.uid, this.referredBy);
      }
    });
  }

  cacheUserProfile(user) {
    this.logger.debug(`Caching: ${JSON.stringify(user)})`);
    this.logger.debug(user);
    this.logger.debug(`Caching: ${user.photoURL}`);
    this.user = {
      photoURL: '/assets/img/anonymous.jpg'
    };

    this.userSubscription = this.userService.getUserById(user.uid).subscribe(data => {
      if (data) {
        this.onboardingComplete = data['onboardingComplete'];
        this.accountType = data['accountType'];
      }
      localStorage.setItem('user', JSON.stringify(user));
      if (!this.onboardingComplete || !this.accountType) {
        this.router.navigate(['onboarding']);
      } else {
        this.router.navigate(['dashboard']);
      }
    });
  }

  onActivate(_event) {
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
