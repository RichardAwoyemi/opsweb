import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class FormUsernameInputService {
  usernameExists = new BehaviorSubject(<any>({ 'status': true }));
}
