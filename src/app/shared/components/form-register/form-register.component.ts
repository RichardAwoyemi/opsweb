import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
  @Input() referredByUser: IUser;
  model: any = {};

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    localStorage.removeItem('user');
  }

  register() {
    if (!this.referredByUser) {
      this.authService.register(
        this.model['email'],
        this.model['password'],
        this.model['firstName'],
        this.model['lastName']);
    } else {
      this.authService.registerWithReferral(
        this.model['email'],
        this.model['password'],
        this.model['firstName'],
        this.model['lastName'],
        this.referredByUser);
    }
  }
}
