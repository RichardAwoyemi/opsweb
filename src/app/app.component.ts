import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from './_services/auth.service';
import { UserService } from './_services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UtilService } from './_services/util.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Opsonion';
  isMobile: Observable<BreakpointState>;
  campaignMode: boolean;
  user: any;
  today: number = Date.now();
  appStoreUrl: string;
  userAgentString: string;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public userService: UserService,
    public utilService: UtilService,
    public afAuth: AngularFireAuth,
    public db: AngularFirestore,
    public router: Router,
    public authService: AuthService) {
    this.afAuth.authState.subscribe(response => {
      if (response && authService.isLoggedIn) {
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
      }
    });
    this.userAgentString = navigator.userAgent;
    this.campaignMode = environment.campaignMode;
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset ]);
    this.appStoreUrl = this.utilService.getAppStoreLink(this.userAgentString);
  }

  onActivate(_event) {
    window.scroll(0, 0);
  }
}
