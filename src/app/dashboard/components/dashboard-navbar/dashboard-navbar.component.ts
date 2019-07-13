import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  @Input() onboardingComplete: string;
  user = {};

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public afAuth: AngularFireAuth
  ) {
    this.afAuth.authState.subscribe(response => {
      this.assignUserProfile(response);
      localStorage.removeItem('referredBy');
    });
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
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
}
