import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormAddressInputService } from './form-address-input.service';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-address-input',
  templateUrl: './form-address-input.component.html'
})
export class FormAddressInputComponent implements OnInit, OnDestroy {
  user: any;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;
  showStreetAddressInputError: any;
  showCityInputError: any;
  showPostcodeInputError: any;

  private streetAddress1Subscription: Subscription;
  private streetAddress2Subscription: Subscription;
  private streetAddressInputErrorSubscription: Subscription;
  private citySubscription: Subscription;
  private cityInputErrorSubscription: Subscription;
  private postcodeSubscription: Subscription;
  private postcodeInputErrorSubscription: Subscription;

  constructor(
    public formAddressInputService: FormAddressInputService,
    private userService: UserService,
    private userStore: Store<fromUser.State>
  ) {
  }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (this.user.streetAddress1) {
            this.streetAddress1 = this.user.streetAddress1;
            this.userService.streetAddress1.next(this.streetAddress1);
            this.formAddressInputService.showStreetAddressInputError.next({ 'status': false });
          }
          if (this.user.streetAddress2) {
            this.streetAddress2 = this.user.streetAddress2;
            this.userService.streetAddress2.next(this.streetAddress2);
          }
          if (this.user.city) {
            this.city = this.user.city;
            this.userService.city.next(this.city);
            this.formAddressInputService.showCityInputError.next({ 'status': false });
          }
          if (this.user.postcode) {
            this.postcode = this.user.postcode;
            this.userService.postcode.next(this.postcode);
            this.formAddressInputService.showPostcodeInputError.next({ 'status': false });
          }
        }
      });

    this.streetAddressInputErrorSubscription = this.formAddressInputService.showStreetAddressInputError.subscribe(response => {
      if (response) {
        this.showStreetAddressInputError = response;
      }
    });

    this.streetAddress1Subscription = this.userService.streetAddress1.subscribe(response => {
      if (response) {
        this.streetAddress1 = response;
      }
    });

    this.streetAddress2Subscription = this.userService.streetAddress2.subscribe(response => {
      if (response) {
        this.streetAddress2 = response;
      }
    });

    this.cityInputErrorSubscription = this.formAddressInputService.showCityInputError.subscribe(response => {
      if (response) {
        this.showCityInputError = response;
      }
    });

    this.citySubscription = this.userService.city.subscribe(response => {
      if (response) {
        this.city = response;
      }
    });

    this.postcodeInputErrorSubscription = this.formAddressInputService.showPostcodeInputError.subscribe(response => {
      if (response) {
        this.showPostcodeInputError = response;
      }
    });

    this.postcodeSubscription = this.userService.postcode.subscribe(response => {
      if (response) {
        this.postcode = response;
      }
    });
  }

  checkStreetAddress1Input() {
    if (this.streetAddress1) {
      this.streetAddress1 = this.streetAddress1.trim();
      if (this.streetAddress1.length > 5) {
        this.formAddressInputService.showStreetAddressInputError.next({ 'status': false });
      } else {
        this.formAddressInputService.showStreetAddressInputError.next({ 'status': true });
      }
      this.userService.streetAddress1.next(this.streetAddress1);
    } else {
      this.formAddressInputService.showStreetAddressInputError.next({ 'status': true });
    }
  }

  checkStreetAddress2Input() {
    if (this.streetAddress2) {
      this.streetAddress2 = this.streetAddress2.trim();
      this.userService.streetAddress2.next(this.streetAddress2);
    }
  }

  checkCityInput() {
    if (this.city) {
      this.city = this.city.trim();
      this.formAddressInputService.showCityInputError.next({ 'status': false });
      this.userService.city.next(this.city);
    } else {
      this.formAddressInputService.showCityInputError.next({ 'status': true });
    }
  }

  checkPostcodeInput() {
    if (this.postcode) {
      this.postcode = this.postcode.trim();
      this.formAddressInputService.showPostcodeInputError.next({ 'status': false });
      this.userService.postcode.next(this.postcode);
    } else {
      this.formAddressInputService.showPostcodeInputError.next({ 'status': true });
    }
  }

  ngOnDestroy() {
    this.streetAddress1Subscription.unsubscribe();
    this.streetAddress2Subscription.unsubscribe();
    this.streetAddressInputErrorSubscription.unsubscribe();
    this.citySubscription.unsubscribe();
    this.cityInputErrorSubscription.unsubscribe();
    this.postcodeSubscription.unsubscribe();
    this.postcodeInputErrorSubscription.unsubscribe();
  }
}
