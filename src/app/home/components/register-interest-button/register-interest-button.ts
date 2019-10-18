import { Component, Input } from '@angular/core';
import { UtilService } from 'src/app/shared/services/util.service';

@Component({
  selector: 'app-register-interest-button',
  templateUrl: './register-interest-button.component.html'
})
export class RegisterInterestButtonComponent {
  @Input() position: string;

  constructor(
    public utilService: UtilService
  ) { }
}
