import { Injectable } from '@angular/core';

@Injectable()
export class FormAddressInputService {
  showDobMonthInputError = false;
  showDobDayInputError = false;
  showDobYearInputError = false;
  showStreetAddress1InputError = false;
  showCityInputError = false;
  showPostcodeInputError = false;

  checkStreetAddress1Input(streetAddress1: string) {
    this.showStreetAddress1InputError = !streetAddress1;
  }

  checkCityInput(city: string) {
    this.showCityInputError = !city;
  }

  checkPostcodeInput(postcode: string) {
    this.showPostcodeInputError = !postcode;
  }
}
