import { Component } from '@angular/core';
import { BreakpointState } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './register.page.html',
})
export class RegisterComponent {
  isMobile: Observable<BreakpointState>;
  referredBySubscription: Subscription;
  referredById: String;
  referredByUserId: String;
  referredByUserData: any;
  currentRanking: any;

  constructor(
    private authService: AuthService,
    private logger: NGXLogger,
    public router: Router
  ) { }

  model: any = {};

  public resolved(captchaResponse: string) {
    this.logger.debug(`Resolved captcha with response ${captchaResponse}:`);
  }

  register() {
    this.authService.register(this.model.email, this.model.password, this.model.firstName,
      this.model.lastName);
  }
}
