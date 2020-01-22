import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';

@Component({
  selector: 'app-form-change-password',
  templateUrl: './form-change-password.component.html'
})
export class FormChangePasswordComponent implements OnInit {
  user: any = {
    photoURL: '/assets/img/anonymous.jpg'
  };
  isPasswordChangeEnabled = false;

  constructor(
    private userStore: Store<fromUser.State>
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
  }

  changePassword() {
    console.log();
  }
}
