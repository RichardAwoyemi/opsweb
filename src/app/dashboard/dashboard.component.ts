import { Component, OnInit } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, combineLatest, from } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from '../_services/user.service';
import { ReferralService } from '../_services/referral.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../_modals/modal.component';
import { filter, map, switchMap } from 'rxjs/operators';
import { UtilService } from '../_services/util.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  invitees: any;
  campaignMode: boolean;
  campaignMessage: string;
  facebookShareUrl: string;
  whatsappShareUrl: string;
  twitterShareUrl: string;
  emailShareUrl: string;
  referralUrl: string;
  anonymousPhotoURL: string;
  firstName: string;
  lastName: string;
  noOfUsers$: Observable<number>;
  ranking$: Observable<number>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private referralService: ReferralService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private ngxLoader: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();

    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.campaignMode = environment.campaignMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';

    this.user = JSON.parse(localStorage.getItem('user'));

    if (this.user.firstName && this.user.lastName) {
      this.userData = {
        firstName: this.user.firstName,
        lastName: this.user.lastName
      };
    }

    this.userService.getUserById(this.user.uid).subscribe(data => {
      if (data) {
        this.userData = data;
        this.referralUrl = this.referralService.generateReferralUrl(this.userData.referralId);
        this.campaignMessage = 'I can hire and work from anywhere on Opsonion, a new platform that ' +
          'connects talent and opportunity. Join me today by signing up using my link: ' + this.referralUrl + '.';
        this.facebookShareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + this.referralUrl;
        this.whatsappShareUrl = 'https://wa.me/?text=' + this.campaignMessage;
        this.twitterShareUrl = 'https://twitter.com/intent/tweet?text=' + this.campaignMessage;
        this.emailShareUrl = 'mailto:?subject=Hire and work from anywhere on Opsonion!&body=' + this.campaignMessage;

        this.userService.getReferredUsers(this.userData.referralId).subscribe(referredUsersResult => {
          if (referredUsersResult && this.userData.referralId) {
            if (environment.production === false) {
              console.log('Referred users: ', referredUsersResult);
            }
            this.invitees = referredUsersResult;
          }
        });

        setTimeout(() => {
          this.ngxLoader.stop();
        }, 3000);
      }
    });

    this.noOfUsers$ = this.userService.getNumberOfUsers().pipe(map(result => {
      return result.data['counter'];
    }));

    this.ranking$ = this.referralService.getWaitlist().pipe(
      filter(waitlistResult => waitlistResult != null),
      switchMap(waitlistResult => combineLatest(from(this.referralService.calculateRanking(this.
        userData.referralId, waitlistResult)), this.noOfUsers$)),
      filter(combined => combined[0] != null && combined[1] != null),
      map(combined => {
        if (combined[0] > combined[1]) {
          return combined[1];
        } else {
          return combined[0];
        }
      })
    );
  }

  copyMessage() {
    const selectBox = document.createElement('textarea');
    selectBox.style.position = 'fixed';
    selectBox.style.left = '0';
    selectBox.style.top = '0';
    selectBox.style.opacity = '0';
    selectBox.value = this.referralUrl;
    document.body.appendChild(selectBox);
    selectBox.focus();
    selectBox.select();
    document.execCommand('copy');
    document.body.removeChild(selectBox);
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Your referral link has been copied to the clipboard.';
    return;
  }

  displayUpdateSuccess() {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Yay!';
    modalReference.componentInstance.message = 'Your settings have been updated.';
  }

  displayGenericError(error) {
    const modalReference = this.modalService.open(ModalComponent, { windowClass: 'modal-holder', centered: true });
    modalReference.componentInstance.header = 'Oops!';
    modalReference.componentInstance.message = error;
  }

  setUserLegalNameData() {
    if (this.firstName && this.lastName) {
      const firstName = this.utilService.toTitleCase(this.firstName);
      const lastName = this.utilService.toTitleCase(this.lastName);
      this.userService.setUserLegalNameData(this.user.uid, firstName, lastName).then(() => {
        this.displayUpdateSuccess();
        location.reload();
      }).catch((error) => {
        this.displayGenericError(error);
      });
    } else {
      this.displayGenericError('Please fill in all required fields.');
    }
  }
}
