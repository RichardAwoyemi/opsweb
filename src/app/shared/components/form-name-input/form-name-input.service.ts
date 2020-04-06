import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormNameInputService {
  showFirstNameInputError = new BehaviorSubject(<any>({ 'status': true }));
  showLastNameInputError = new BehaviorSubject(<any>({ 'status': true }));

  checkFirstNameInput(firstName: string) {
    this.showFirstNameInputError.next({ 'status': !firstName });
  }

  checkLastNameInput(lastName: string) {
    this.showLastNameInputError.next({ 'status': !lastName });
  }
}
