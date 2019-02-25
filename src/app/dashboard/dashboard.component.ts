import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';
import { ReferralService } from '../_services/referral.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  invitees: any;
  waitlist: any;
  ranking: any;
  campaignMode: boolean;
  campaignMessage: string;
  referralUrl: string;
  noOfUsers: number;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private referralService: ReferralService,
    private modalService: NgbModal,
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

        this.waitlist = this.referralService.getWaitlist().subscribe(waitlistResult => {
          if (waitlistResult) {
            this.ranking = this.referralService.calculateRanking(this.userData.referralId, waitlistResult);
          }
        });

        this.userService.getReferredUsers(this.userData.referralId).subscribe(referredUsersResult => {
          if (referredUsersResult) {
            console.log('Referred users: ', referredUsersResult);
            this.invitees = referredUsersResult;
          }
        });
      }
    });

    this.userService.getNumberOfUsers().subscribe(data => {
      if (data) {
        this.noOfUsers = data.data['counter'];
      }
    });
  }

  copyMessage() {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.style.left = '0';
    selectBox.style.top = '0';
    selectBox.style.opacity = '0';
    selectBox.value = this.campaignMessage;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Your referral message has been copied to the clipboard.';
    return;  }
}
