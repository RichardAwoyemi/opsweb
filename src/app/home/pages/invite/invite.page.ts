import { Component, OnInit, OnDestroy } from '@angular/core';
import { BreakpointState, BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.page.html',
  styleUrls: ['./invite.page.css']
})
export class InviteComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  referredById: String;
  referredByUserId: String;
  referredByUserData: any;
  currentRanking: any;

  private referredBySubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router
  ) {}

  ngOnInit() {
    localStorage.removeItem('user');
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

  ngOnDestroy() {
    this.referredBySubscription.unsubscribe();
  }
}
