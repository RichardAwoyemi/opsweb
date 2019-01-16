import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  user: any;
  today: number = Date.now();
  appStoreUrl: string;
  userAgentString: string;
  iosAppUrl = 'https://itunes.apple.com';
  androidAppUrl = 'https://play.google.com';

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public router: Router,
    public authService: AuthService) {
    this.afAuth.authState.subscribe(response => {
      if (response) {
        const userDoc = db.doc<any>(`users/${response.uid}`);
        userDoc.snapshotChanges().subscribe(value => {
          this.user = {
            firstName: value.payload.data().firstName,
            lastName: value.payload.data().lastName,
            email: value.payload.data().email,
            photoURL: value.payload.data().photoURL,
            username: value.payload.data().username
          };
          if (!this.user.photoURL) {
            this.user.photoURL = 'https://i.imgflip.com/1slnr0.jpg';
          }
          if (!this.user.username) {
            // this.router.navigate(['setup-profile']);
          }
        });
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
    this.userAgentString = navigator.userAgent;
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
    if (this.userAgentString.indexOf('iPhone') > -1 ||
        this.userAgentString.indexOf('iPod') > -1 ||
        this.userAgentString.indexOf('iPad') > -1) {
      this.appStoreUrl = this.iosAppUrl;
    } else if (/Android/.test(this.userAgentString)) {
      this.appStoreUrl = this.androidAppUrl;
    }
  }

  onActivate(_event) {
    window.scroll(0, 0);
  }
}
