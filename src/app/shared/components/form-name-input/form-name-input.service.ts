import { Injectable } from '@angular/core';

@Injectable()
export class FormNameInputService {
  showFirstNameInputError = false;
  showLastNameInputError = false;

  checkFirstNameInput(firstName: string) {
    this.showFirstNameInputError = !firstName;
  }

  checkLastNameInput(lastName: string) {
    this.showLastNameInputError = !lastName;
  }
}
