import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html'
})
export class RegisterFormComponent implements OnInit {
  @Input() referredByUser: string;
  @Input() referredById: string;
  model: any = {};

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    localStorage.removeItem('user');
  }

  registerWithReferral() {
    this.authService.registerWithReferral(this.model.email, this.model.password, this.model.firstName,
      this.model.lastName, this.referredById);
  }
}
