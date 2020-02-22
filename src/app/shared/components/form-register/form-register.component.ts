import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html'
})
export class FormRegisterComponent implements OnInit {
  @Input() referredByUser: string;
  @Input() referredById: string;
  model: any = {};

  constructor() {
  }

  ngOnInit() {
    localStorage.removeItem('user');
  }

  registerWithReferral() {
    return false;
  }
}
