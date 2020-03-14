import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../shared/models/user';
import * as fromUser from '../../../core/store/user/user.reducer';
import { Store } from '@ngrx/store';
import { UtilService } from '../../../../shared/services/util.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard-body-rewards',
  templateUrl: './dashboard-body-rewards.component.html',
  styleUrls: ['./dashboard-body-rewards.component.css']
})
export class DashboardBodyRewardsComponent implements OnInit {
  user: IUser;
  innerHeight: number;
  referralId: string;
  referralUrl: string;
  referralMessage: string;
  facebookShareUrl: string;
  whatsappShareUrl: string;
  twitterShareUrl: string;
  emailShareUrl: string;

  constructor(
    private userStore: Store<fromUser.State>,
    private toastrService: ToastrService,
    private ngxLoader: NgxUiLoaderService
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.innerHeight = window.innerHeight;
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          this.referralId = this.user.referralId;
          this.referralUrl = document.location.href.split('/')[2] + '/referral/' + this.referralId;
          this.createReferralUrls(this.referralUrl);
        }
      });
    this.ngxLoader.stop();
  }

  createReferralUrls(referralUrl) {
    this.referralMessage = `Want to build a cool website without writing a single line of code? Sign up to join Opsonion at ${this.referralUrl}!`;
    this.facebookShareUrl = `http://www.facebook.com/sharer/sharer.php?u=${referralUrl}`;
    this.whatsappShareUrl = `https://wa.me/?text=${this.referralMessage}`;
    this.twitterShareUrl = `https://twitter.com/intent/tweet?text=${this.referralMessage}`;
    this.emailShareUrl = `mailto:?subject=Build the sites you want with the ease you deserve!&body=${this.referralMessage}`;
  }

  copyMessage() {
    UtilService.copyMessage(this.referralUrl);
    this.toastrService.success('Your referral link has been copied.', 'Great!');
  }
}
