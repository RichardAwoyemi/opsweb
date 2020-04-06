import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormDobInputService {
  showDobMonthInputError = new BehaviorSubject(<any>({ 'status': true }));
  showDobDayInputError = new BehaviorSubject(<any>({ 'status': true }));
  showDobYearInputError = new BehaviorSubject(<any>({ 'status': true }));
}
