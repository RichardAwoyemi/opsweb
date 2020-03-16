import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromUser from '../../../../core/store/user/user.reducer';
import { IUser } from '../../../../../shared/models/user';
import { FormUsernameInputService } from '../../../../../shared/components/form-username-input/form-username-input.service';
import { Subscription } from 'rxjs';
import { UserService } from '../../../../../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormNameInputService } from '../../../../../shared/components/form-name-input/form-name-input.service';
import { FormDobInputService } from '../../../../../shared/components/form-dob-input/form-dob-input.service';
import { FormAddressInputService } from '../../../../../shared/components/form-address-input/form-address-input.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html'
})
export class SettingsProfileComponent implements OnInit, OnDestroy {
  user: IUser;
  username: string;
  firstName: string;
  lastName: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;
  dobDay: string;
  dobMonth: string;
  dobYear: string;
  usernameExists: any;
  showFirstNameInputError: any;
  showLastNameInputError: any;
  showDobDayInputError: any;
  showDobMonthInputError: any;
  showDobYearInputError: any;
  showStreetAddressInputError: any;
  showCityInputError: any;
  showPostcodeInputError: any;

  private usernameExistsSubscription: Subscription;
  private usernameSubscription: Subscription;
  private firstNameSubscription: Subscription;
  private lastNameSubscription: Subscription;
  private streetAddress1Subscription: Subscription;
  private streetAddress2Subscription: Subscription;
  private citySubscription: Subscription;
  private postcodeSubscription: Subscription;
  private dobDaySubscription: Subscription;
  private dobMonthSubscription: Subscription;
  private dobYearSubscription: Subscription;
  private showFirstNameInputErrorSubscription: Subscription;
  private showLastNameInputErrorSubscription: Subscription;
  private showDobDayInputErrorSubscription: Subscription;
  private showDobMonthInputErrorSubscription: Subscription;
  private showDobYearInputErrorSubscription: Subscription;
  private showStreetAddressInputErrorSubscription: Subscription;
  private showCityInputErrorSubscription: Subscription;

  constructor(
    private userStore: Store<fromUser.State>,
    private formUsernameInputService: FormUsernameInputService,
    private formNameInputService: FormNameInputService,
    private formDobInputService: FormDobInputService,
    private formAddressInputService: FormAddressInputService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (result.username) {
            this.userService.username.next(result.username);
          }
        }
      });

    this.usernameExistsSubscription = this.formUsernameInputService.usernameExists.subscribe((response => {
      if (response) {
        this.usernameExists = response;
      }
    }));

    this.usernameSubscription = this.userService.username.subscribe((response => {
      if (response) {
        this.username = response;
      }
    }));

    this.firstNameSubscription = this.userService.firstName.subscribe((response => {
      if (response) {
        this.firstName = response;
      }
    }));

    this.lastNameSubscription = this.userService.lastName.subscribe((response => {
      if (response) {
        this.lastName = response;
      }
    }));

    this.streetAddress1Subscription = this.userService.streetAddress1.subscribe((response => {
      if (response) {
        this.streetAddress1 = response;
      }
    }));

    this.streetAddress2Subscription = this.userService.streetAddress2.subscribe((response => {
      if (response) {
        this.streetAddress2 = response;
      }
    }));

    this.citySubscription = this.userService.city.subscribe((response => {
      if (response) {
        this.city = response;
      }
    }));

    this.postcodeSubscription = this.userService.postcode.subscribe((response => {
      if (response) {
        this.postcode = response;
      }
    }));

    this.dobDaySubscription = this.userService.dobDay.subscribe((response => {
      if (response) {
        this.dobDay = response;
      }
    }));

    this.dobMonthSubscription = this.userService.dobMonth.subscribe((response => {
      if (response) {
        this.dobMonth = response;
      }
    }));

    this.dobYearSubscription = this.userService.dobYear.subscribe((response => {
      if (response) {
        this.dobYear = response;
      }
    }));

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

    this.showDobDayInputErrorSubscription = this.formDobInputService.showDobDayInputError.subscribe(result => {
      if (result) {
        this.showDobDayInputError = result;
      }
    });

    this.showDobMonthInputErrorSubscription = this.formDobInputService.showDobMonthInputError.subscribe(result => {
      if (result) {
        this.showDobMonthInputError = result;
      }
    });

    this.showDobYearInputErrorSubscription = this.formDobInputService.showDobYearInputError.subscribe(result => {
      if (result) {
        this.showDobYearInputError = result;
      }
    });

    this.showStreetAddressInputErrorSubscription = this.formAddressInputService.showStreetAddressInputError.subscribe(result => {
      if (result) {
        this.showStreetAddressInputError = result;
      }
    });

    this.showCityInputErrorSubscription = this.formAddressInputService.showCityInputError.subscribe(result => {
      if (result) {
        this.showCityInputError = result;
      }
    });

    this.postcodeSubscription = this.formAddressInputService.showPostcodeInputError.subscribe(result => {
      if (result) {
        this.showPostcodeInputError = result;
      }
    });
  }

  setUserPersonalDetails() {
    if (!this.user.uid || this.usernameExists['status'] || this.showFirstNameInputError['status'] ||
      this.showLastNameInputError['status'] || this.showDobDayInputError['status'] || this.showDobMonthInputError['status'] ||
      this.showDobYearInputError['status'] || this.showStreetAddressInputError['status'] ||
      this.showCityInputError['status'] || this.showPostcodeInputError['status']) {
      this.toastrService.warning('Please fill in all the required fields', 'Oops!');
    } else {
      if (!this.streetAddress2) {
        this.streetAddress2 = null;
      }
      this.userService.setUserPersonalDetails(this.user.uid, this.username, this.firstName, this.lastName, this.dobDay,
        this.dobMonth, this.dobYear, this.streetAddress1, this.streetAddress2, this.city, this.postcode);
      this.toastrService.success('Your profile has been updated.', 'Great!');
    }
  }

  ngOnDestroy() {
    this.usernameExistsSubscription.unsubscribe();
    this.usernameSubscription.unsubscribe();
  }
}
