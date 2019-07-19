import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterService {
  static currentRoute = new BehaviorSubject<string>('/');
}
