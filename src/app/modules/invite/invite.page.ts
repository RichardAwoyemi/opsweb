import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../shared/models/user';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html'
})
export class InviteComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  referredById: String;
  referredByUser: IUser = {
    uid: null,
    credits: 0,
    email: null,
    displayName: null,
    photoURL: null,
    emailVerified: null,
    dobDay: null,
    dobMonth: null,
    dobYear: null,
    postcode: null,
    selectedCurrency: null,
    streetAddress1: null,
    streetAddress2: null,
    city: null,
    username: null,
    firstName: null,
    lastName: null,
    referralId: null,
    referredBy: null
  };

  private referredBySubscription: Subscription;

  constructor(
    private ngxLoader: NgxUiLoaderService,
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    public router: Router
  ) {
  }


  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
    this.referredBySubscription = this.route.params.subscribe(params => {
      this.referredById = params['id'];
      if (this.referredById) {
        this.userService.getUserByReferralId(this.referredById).subscribe(data => {
          if (data[0]) {
            this.referredByUser = UserService.parseData(data[0]);
          } else {
            this.router.navigate(['register']);
          }
        });
      }
    });
    this.ngxLoader.stop();
  }

  ngOnDestroy() {
    this.referredBySubscription.unsubscribe();
  }
}
