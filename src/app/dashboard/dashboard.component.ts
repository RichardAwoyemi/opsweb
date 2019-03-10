import { Component, OnInit, OnDestroy } from '@angular/core';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, combineLatest, from, Subscription } from 'rxjs';
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
export class DashboardComponent implements OnInit, OnDestroy {
  isMobile: Observable<BreakpointState>;
  user: any;
  userData: any;
  invitees: any;
  referralMode: boolean;
  campaignMessage: string;
  facebookShareUrl: string;
  whatsappShareUrl: string;
  twitterShareUrl: string;
  emailShareUrl: string;
  referralUrl: string;
  anonymousPhotoURL: string;
  firstName: string;
  lastName: string;
  user$: Observable<any>;
  referralUrl$: Observable<string>;
  noOfUsers$: Observable<number>;
  ranking$: Observable<number>;

  private userSubscription: Subscription;
  private referredUserSubscription: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private referralService: ReferralService,
    private utilService: UtilService,
    private modalService: NgbModal,
    private ngxLoader: NgxUiLoaderService
  ) {
    this.userData = {
      firstName: null,
      lastName: null
    };
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset]);
    this.referralMode = environment.referralMode;
    this.anonymousPhotoURL = 'https://i.imgflip.com/1slnr0.jpg';
    this.user = JSON.parse(localStorage.getItem('user'));

    this.userSubscription = this.userService.getUserById(this.user.uid).subscribe(result => {
      if (result) {
        this.setUser(result);
        this.createReferralUrls();
        this.calculateNoOfUsers();
        this.calculateRanking();
        this.getReferredUsers();
        this.ngxLoader.stop();
      }
    });
  }

  setUser(result) {
    if (!environment.production) {
      console.log(result);
    }
    this.userData = result;
  }

  createReferralUrls() {
    this.referralUrl = this.referralService.generateReferralUrl(this.userData.referralId);
    this.campaignMessage = 'I can hire and work from anywhere on Opsonion, a new platform that ' +
      'connects talent and opportunity. Join me today by signing up using my link: ' + this.referralUrl + '.';
    this.facebookShareUrl = 'http://www.facebook.com/sharer/sharer.php?u=' + this.referralUrl;
    this.whatsappShareUrl = 'https://wa.me/?text=' + this.campaignMessage;
    this.twitterShareUrl = 'https://twitter.com/intent/tweet?text=' + this.campaignMessage;
    this.emailShareUrl = 'mailto:?subject=Hire and work from anywhere on Opsonion!&body=' + this.campaignMessage;
  }

  calculateNoOfUsers() {
    this.noOfUsers$ = this.userService.getNumberOfUsers().pipe(map(result => {
      return result.data['counter'];
    }));
  }

  getReferredUsers() {
    if (this.userData.referralId) {
      this.referredUserSubscription = this.userService.getReferredUsers(this.userData.referralId).subscribe(result => {
        if (!environment.production) {
          console.log(result);
        }
        this.invitees = result;
      });
    }
  }

  calculateRanking() {
    this.ranking$ = this.referralService.getWaitlist().pipe(
      filter(waitlistResult => waitlistResult != null),
      switchMap(waitlistResult => combineLatest(
      from(this.referralService.calculateRanking(this.userData.referralId, waitlistResult)), this.noOfUsers$)),
      filter(combined => combined[0] != null && combined[1] != null),
      map(combined => {
        if (!environment.production) {
          console.log('User ranking: ' + combined[0]);
          console.log('Number of users: ' + combined[1]);
        }
        if (combined[0] > combined[1]) {
          return combined[1];
        } else {
          return combined[0];
        }
      })
    );
  }

  copyMessage() {
    this.utilService.copyMessage(this.referralUrl);
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
      }).catch((error) => {
        this.displayGenericError(error);
      });
    } else {
      this.displayGenericError('Please fill in all required fields.');
    }
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }

    if (this.referredUserSubscription) {
      this.referredUserSubscription.unsubscribe();
    }
  }
}
