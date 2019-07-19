import { Component, Input, OnInit } from '@angular/core';
import { FormAddressInputService } from './form-address-input.service';
import { UserService } from '../../services/user.service';
import { IUser } from 'src/app/shared/models/user';
import { Store } from '@ngrx/store';
import * as fromUser from 'src/app/modules/core/store/user/user.reducer';

@Component({
  selector: 'app-form-address-input',
  templateUrl: './form-address-input.component.html'
})
export class FormAddressInputComponent implements OnInit {
  @Input() user: any;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  postcode: string;

  constructor(
    public formAddressInputService: FormAddressInputService,
    private userService: UserService,
    private userStore: Store<fromUser.State>
  ) { }

  ngOnInit() {
    this.userStore.select('user')
      .pipe()
      .subscribe(async (result: IUser) => {
        if (result) {
          this.user = result;
          if (this.user.streetAddress1) {
            this.streetAddress1 = this.user.streetAddress1;
          }
          if (this.user.streetAddress2) {
            this.streetAddress2 = this.user.streetAddress2;
          }
          if (this.user.city) {
            this.city = this.user.city;
          }
          if (this.user.postcode) {
            this.postcode = this.user.postcode;
          }
        }
      });
  }

  checkStreetAddress1Input() {
    this.formAddressInputService.checkStreetAddress1Input(this.streetAddress1);
    if (this.streetAddress1) {
      this.user.streetAddress1 = this.streetAddress1.trim();
      this.userService.user.next(this.user);
    }
  }

  checkStreetAddress2Input() {
    if (this.streetAddress2) {
      this.user.streetAddress2 = this.streetAddress2.trim();
      this.userService.user.next(this.user);
    }
  }

  checkCityInput() {
    this.formAddressInputService.checkCityInput(this.city);
    if (this.city) {
      this.user.city = this.city.trim();
      this.userService.user.next(this.user);
    }
  }

  checkPostcodeInput() {
    this.formAddressInputService.checkPostcodeInput(this.postcode);
    if (this.postcode) {
      this.user.postcode = this.postcode.trim();
      this.userService.user.next(this.user);
    }
  }
}
