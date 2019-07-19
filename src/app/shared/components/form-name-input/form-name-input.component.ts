import { Component, OnInit } from '@angular/core';
import { FormNameInputService } from './form-name-input.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';

@Component({
  selector: 'app-form-name-input',
  templateUrl: './form-name-input.component.html'
})
export class FormNameInputComponent implements OnInit {
  firstName: string;
  lastName: string;

  constructor(
    public formNameInputService: FormNameInputService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          if (result.firstName) {
            this.firstName = result.firstName;
          }
          if (result.lastName) {
            this.lastName = result.lastName;
          }
        }
      });
  }

  onChangeUpdateFirstName() {
    this.formNameInputService.checkFirstNameInput(this.firstName);
    if (this.firstName) {
      this.firstName.trim();
    }
  }

  onChangeUpdateLastName() {
    this.formNameInputService.checkLastNameInput(this.lastName);
    if (this.lastName) {
      this.lastName.trim();
    }
  }
}
