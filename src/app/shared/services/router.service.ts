import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class RouterService {
  currentRoute = new BehaviorSubject<string>('/');
}
