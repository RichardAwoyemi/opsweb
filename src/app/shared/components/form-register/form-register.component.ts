import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
  @Input() referredByUser: string;
  @Input() referredById: string;
  model: any = {};

  constructor(
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    localStorage.removeItem('user');
  }

  register() {
    this.authService.register(this.model['email'], this.model['password'], this.model['firstName'], this.model['lastName']);
  }
}
