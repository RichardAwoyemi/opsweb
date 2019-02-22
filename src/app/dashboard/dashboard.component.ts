import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';
import { ReferralService } from '../_services/referral.service';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  campaignMode: boolean;
  campaignMessage: string;
  referralUrl: string;
  noOfUsers: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private referralService: ReferralService
  ) {
  }

  ngOnInit() {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Tablet]);
    this.campaignMode = environment.campaignMode;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userService.getUserById(this.user.uid).subscribe(data => {
      if (data) {
        this.userData = data;
        this.referralUrl = this.referralService.generateReferralUrl(this.userData.referralId);
        this.campaignMessage = 'I am creating new income streams working for digital currency on Opsonion. ' +
        'Join me today by signing up using my link: ' + this.referralUrl + '.';
      }
    });

    this.userService.getNumberOfUsers().subscribe(data => {
      if (data) {
        this.noOfUsers = data.data['counter'];
      }
    });
  }
}
