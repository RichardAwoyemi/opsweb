import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit, OnDestroy {
  referredById: String;
  referredByUserId: String;
  referredByUserData: any;
  currentRanking: any;
  isMobile: Observable<BreakpointState>;

  private referredBySubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private logger: NGXLogger,
    public router: Router
  ) {}

  model: any = {};

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);

    this.referredBySubscription = this.route.params.subscribe(params => {
      this.referredById = params['id'];
      if (this.referredById) {
        this.userService.getUserByReferralId(this.referredById).subscribe(data => {
          if (data[0]) {
            this.referredByUserData = data[0];
          } else {
            this.router.navigate(['register']);
          }
        });
      }
    });
  }

  public resolved(captchaResponse: string) {
    this.logger.debug(`Resolved captcha with response ${captchaResponse}:`);
  }

  registerWithReferral() {
    const email = this.model.email;
    const password = this.model.password;
    const firstName = this.model.firstName;
    const lastName = this.model.lastName;
    this.authService.registerWithReferral(email, password, firstName, lastName, this.referredById);
  }

  mobileGoogleSignInWithReferral() {
    this.authService.mobileGoogleSignInWithReferral(this.referredById);
  }

  googleSignInWithReferral() {
    this.authService.googleSignInWithReferral(this.referredById);
  }

  mobileFacebookSignInWithReferral() {
    this.authService.mobileFacebookSignInWithReferral(this.referredById);
  }

  facebookSignInWithReferral() {
    this.authService.facebookSignInWithReferral(this.referredById);
  }

  ngOnDestroy() {
    this.referredBySubscription.unsubscribe();
  }
}
