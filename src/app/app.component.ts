import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UtilService } from './_services/util.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  user: any = {
    photoURL: 'https://i.imgflip.com/1slnr0.jpg'
  };
  today: number = Date.now();
  appStoreUrl: string;
  userAgentString: string;
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
    this.userAgentString = navigator.userAgent;
    this.afAuth.authState.subscribe(response => {
      this.referredBy = localStorage.getItem('referredBy');
      this.assignUserProfile(response);
      this.processMobileLogin(response);
      this.processMobileReferralLogin(response);
      localStorage.removeItem('referredBy');
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.appStoreUrl = this.utilService.getAppStoreLink(this.userAgentString);
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
        this.logger.debug(`Result is ${result.matches}, so processing mobile login`);
        this.authService.processMobileLogin(response.providerData[0], response.uid);
      }
    });
  }

  processMobileReferralLogin(response) {
    this.isMobile.subscribe(result => {
      if (result.matches && this.referredBy && response && response.providerData[0].providerId === 'facebook.com' ||
        result.matches && this.referredBy && response && response.providerData[0].providerId === 'google.com') {
        this.logger.debug(`Result is ${result.matches}, so processing mobile referral login`);
        this.authService.processMobileReferralLogin(response.providerData[0], response.uid, this.referredBy);
      }
    });
  }

  assignUserProfile(response) {
    if (response && this.authService.isLoggedIn) {
      this.user = {
        firstName: response['firstName'],
        lastName: response['lastName'],
        email: response['email'],
        photoURL: response['photoURL'],
        username: response['username']
      };
    }
  }

  cacheUserProfile(user) {
    this.logger.debug('Caching:');
    this.logger.debug(user);
    this.logger.debug('Caching: ' + user.photoURL);
    this.user = {
      photoURL: 'https://i.imgflip.com/1slnr0.jpg'
    };

    this.userSubscription = this.userService.getUserById(user.uid).subscribe(data => {
      if (data) {
        if (data['photoURL']) {
          this.user = {
            photoURL: data['photoURL']
          };
        }
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
