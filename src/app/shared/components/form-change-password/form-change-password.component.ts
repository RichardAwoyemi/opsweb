import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html'
})
export class FormChangePasswordComponent implements OnInit {
  user: any = {
    photoURL: '/assets/img/anonymous.jpg'
  };
  isPasswordChangeEnabled = false;
  account: any;

  constructor(
    private userStore: Store<fromUser.State>,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });

    this.account = this.authService.checkAccountType();
    if (this.account[0]['providerId'] === 'password') {
      this.isPasswordChangeEnabled = true;
    }
  }

  changePassword() {
    this.authService.resetPassword(this.account[0]['email']);
  }
}
