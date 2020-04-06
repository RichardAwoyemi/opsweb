import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormAddressInputService {
  showStreetAddressInputError = new BehaviorSubject(<any>({ 'status': true }));
  showCityInputError = new BehaviorSubject(<any>({ 'status': true }));
  showPostcodeInputError = new BehaviorSubject(<any>({ 'status': true }));
}
