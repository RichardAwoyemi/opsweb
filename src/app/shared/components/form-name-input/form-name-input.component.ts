import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormNameInputService } from './form-name-input.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-form-name-input',
  templateUrl: './form-name-input.component.html'
})
export class FormNameInputComponent implements OnInit, OnDestroy {
  firstName: string;
  lastName: string;
  showFirstNameInputError: any;
  showLastNameInputError: any;

  private showFirstNameInputErrorSubscription: Subscription;
  private showLastNameInputErrorSubscription: Subscription;

  constructor(
    public formNameInputService: FormNameInputService,
    public userService: UserService,
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
            this.formNameInputService.showFirstNameInputError.next({ 'status': !this.firstName });
            this.userService.firstName.next(this.firstName);
          }
          if (result.lastName) {
            this.lastName = result.lastName;
            this.formNameInputService.showLastNameInputError.next({ 'status': !this.lastName });
            this.userService.lastName.next(this.lastName);
          }
        }
      });

    this.showFirstNameInputErrorSubscription = this.formNameInputService.showFirstNameInputError.subscribe(result => {
      if (result) {
        this.showFirstNameInputError = result;
      }
    });

    this.showLastNameInputErrorSubscription = this.formNameInputService.showLastNameInputError.subscribe(result => {
      if (result) {
        this.showLastNameInputError = result;
      }
    });
  }

  onChangeUpdateFirstName() {
    this.userService.firstName.next(this.firstName);
    this.formNameInputService.checkFirstNameInput(this.firstName);
  }

  onChangeUpdateLastName() {
    this.userService.lastName.next(this.lastName);
    this.formNameInputService.checkLastNameInput(this.lastName);
  }

  ngOnDestroy() {
    this.showFirstNameInputErrorSubscription.unsubscribe();
    this.showLastNameInputErrorSubscription.unsubscribe();
  }
}
