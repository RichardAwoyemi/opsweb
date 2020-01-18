import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
    private ngxLoader: NgxUiLoaderService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.ngxLoader.start();
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
        }
      });
    this.ngxLoader.stop();
  }

  changePassword() {
    console.log();
  }
}
