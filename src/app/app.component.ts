import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UtilService } from './_services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  referralMode: boolean;
  user: any = {
    photoURL: 'https://i.imgflip.com/1slnr0.jpg'
  };
  today: number = Date.now();
  appStoreUrl: string;
  userAgentString: string;
  referredBy: string;

  private authSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public utilService: UtilService,
    public afAuth: AngularFireAuth,
    public router: Router,
    public authService: AuthService) {
    this.userAgentString = navigator.userAgent;
    this.referralMode = environment.referralMode;
    this.afAuth.authState.subscribe(response => {
      this.referredBy = localStorage.getItem('referredBy');
      this.assignUserProfile(response);
      this.processMobileLogin(response);
      this.processMobileReferralLogin(response);
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset ]);
    this.appStoreUrl = this.utilService.getAppStoreLink(this.userAgentString);
    this.authSubscription = this.afAuth.authState.subscribe(user => {
      if (user) {
        this.cacheUserProfile(user);
      }
    });
  }

  processMobileLogin(response) {
    if (this.isMobile && !this.referredBy && response && response.providerData[0].providerId === 'facebook.com' ||
        this.isMobile && !this.referredBy && response && response.providerData[0].providerId === 'google.com') {
      this.authService.processMobileLogin(response.providerData[0], response.uid);
    }
  }

  processMobileReferralLogin(response) {
    if (this.isMobile && this.referredBy && response && response.providerData[0].providerId === 'facebook.com' ||
        this.isMobile && this.referredBy && response && response.providerData[0].providerId === 'google.com') {
      this.authService.processMobileReferralLogin(response.providerData[0], response.uid, this.referredBy);
    }
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
    if (!environment.production) {
      console.log(user);
    }
    this.user = {
      photoURL: user.photoURL
    };
    localStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['dashboard']);
  }

  onActivate(_event) {
    window.scroll(0, 0);
  }

  ngOnDestroy() {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
