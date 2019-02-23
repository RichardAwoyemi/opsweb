import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  referredById: String;
  referredByUserId: String;
  referredBy: any;
  referredByUserData: any;
  currentRanking: any;
  isMobile: Observable<BreakpointState>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    public router: Router,
  ) {}

  model: any = {};

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([ Breakpoints.Handset, Breakpoints.Tablet ]);

    this.referredBy = this.route.params.subscribe(params => {
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
    if (environment.production === false) {
      console.log(`Resolved captcha with response ${captchaResponse}:`);
    }
  }

  registerWithReferral() {
    const email = this.model.email;
    const password = this.model.password;
    const firstName = this.model.firstName;
    const lastName = this.model.lastName;
    this.authService.registerWithReferral(email, password, firstName, lastName, this.referredById);
  }

  googleSignInWithReferral() {
    this.authService.googleSignInWithReferral();
  }

  facebookSignInWithReferral() {
    this.authService.facebookSignIn();
  }
}
